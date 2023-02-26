from django.http import JsonResponse
from main.utils import get_tokens_for_user
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.contrib.auth import update_session_auth_hash
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
# ===========================================================================

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
# ===========================================================================
from main.serializer import (
    RegistrationSerializer,
    PassChangeFormSerializer,
    ProfileSerializer,
    UpdateProfileFormSerializer,
    UserSerializer,
    DoctorSerializer,
    PatientSerializer,
    ReceptorSerializer,
    AppointmentSerializer,
    TreatmentSerializer,
)
# ===========================================================================
from main.models import Receptor, Doctor, Profile, Patient, Appointment, Treatment
# ===========================================================================


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ===========================================================================


@api_view(['GET'])
def getRoutes(request):
    routes = [
        "/api/token",
        "api/token/refresh"
    ]

    return Response(routes)
# ===========================================================================


@api_view(['POST'])
def userRegister(request):
    username = request.data["username"]
    users = User.objects.filter(username=username)

    if users.exists():
        print("user is already exist with this username")
        return Response({"detail": "user is already exist with this username"}, status.HTTP_208_ALREADY_REPORTED)
    serializer_register_form = RegistrationSerializer(data=request.data)
    error_data = {}
    auth_data = {}
    if serializer_register_form.is_valid():
        serializer_register_form.save()
        user = User.objects.get(username=username)
        auth_data = {**auth_data, **get_tokens_for_user(user)}
        userSerializer = UserSerializer(user)
        auth_data["user"] = userSerializer.data
        print("user is created", auth_data)
        return Response(auth_data, status=status.HTTP_201_CREATED)
    else:

        error_data["register_error"] = serializer_register_form.errors
        print("error to save", error_data)
    return Response(error_data, status=status.HTTP_400_BAD_REQUEST)

# ===========================================================================


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    userSerializer = UserSerializer(request.user)
    profile, is_profile_created = Profile.objects.get_or_create(
        user=request.user)
    profileSerializer = ProfileSerializer(profile)
    absolute_image_url = request.build_absolute_uri(request.user.profile.get_image(
    )) if request.user.profile.get_image() != None else None
    data = {
        "user": {
            **userSerializer.data,
            **profileSerializer.data,
            "image": absolute_image_url
        }
    }
    if Doctor.objects.filter(user=request.user).exists():
        data["user"]["is_doctor"] = True
    elif Receptor.objects.filter(user=request.user).exists():
        data["user"]["is_receptor"] = True
    else:
        data["user"]["is_patient"] = True

    return Response(data)

# ===========================================================================


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    profile, created = Profile.objects.get_or_create(
        user=request.user)
    serializer_profile_form = UpdateProfileFormSerializer(
        data=request.data, instance=profile)

    if serializer_profile_form.is_valid():
        profile = serializer_profile_form.save()
        request.user.email = request.data.get("email")
        print(request.data.get("email"), ">>>>>>>>>>>>>>>>>>")
        request.user.save()
        profileSerializer = ProfileSerializer(profile)
        return Response(profileSerializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer_profile_form.errors, status=status.HTTP_400_BAD_REQUEST)


# ===========================================================================
@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def updatePassword(request):
    serializer_password_form = PassChangeFormSerializer(
        data=request.data, instance=request.user)
    if serializer_password_form.is_valid():
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        if not request.user.check_password(old_password):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        request.user.set_password(new_password)
        request.user.save()
        userSerializer = UserSerializer(request.user)
        return Response(userSerializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer_password_form.errors, status=status.HTTP_400_BAD_REQUEST)
# ===========================================================================


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def searchPatients(request):
    username = request.GET.get("q")
    patients = User.objects.exclude(
        Q(is_superuser=True) |
        Q(id__in=Receptor.objects.only("id")) |
        Q(id__in=Doctor.objects.only("id"))
    ).filter(username__icontains=username)
    patients_list = []
    for patient in patients:
        patient_data = {
            **UserSerializer(patient.user).data,
            **ProfileSerializer(patient.user.profile).data,
            **PatientSerializer(patient).data,
            "treatments": patient.treatment_set.count(),
            "appointments": patient.appointment_set.count(),
        }
        patients_list.append(patient_data)

    return Response(patients_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPatients(request):
    patients = Patient.objects.all()
    patients_list = []
    for patient in patients:
        patient_data = {**UserSerializer(patient.user).data,
                        **ProfileSerializer(patient.user.profile).data,
                        **PatientSerializer(patient).data,
                        }
        patients_list.append(patient_data)

    return Response(patients_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDoctors(request):
    doctors = Doctor.objects.all()
    doctors_list = []
    for doctor in doctors:
        doctor_data = {**UserSerializer(doctor.user).data,
                       **ProfileSerializer(doctor.user.profile).data,
                       **DoctorSerializer(doctor).data,
                       "pending_treatments": doctor.treatment_set.filter(status="pending").count(),
                       "treated_treatments": doctor.treatment_set.filter(status="treated").count()
                       }
        doctors_list.append(doctor_data)

    return Response(doctors_list, status=status.HTTP_200_OK)


@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def addTreatment(request):
    serializer_treatment_form = TreatmentSerializer(
        data=request.data)
    if serializer_treatment_form.is_valid():
        treatment_serializer = serializer_treatment_form.save()
        treatment = TreatmentSerializer(treatment_serializer)
        return Response(treatment.data, status=status.HTTP_201_CREATED)
    return Response(serializer_treatment_form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def setPatientTreated(request):
    treatment_id = request.data.get("treatment_id")
    treatment = Treatment.objects.get(id=treatment_id)
    treatment.status = "treated"
    treatment.save()
    return Response({}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPendingTreatment(request):
    # print(request.data.get("doctor"))
    # if request.user.doctor.id != request.data.get("doctor"):
    #     return Response({"detail": "only doctor can access"}, status=status.HTTP_400_BAD_REQUEST)
    # patient = Patient.objects.get(id=request.data.get("patient"))
    doctor = request.user.doctor
    treatments = Treatment.objects.filter(doctor=doctor, status="pending")
    treatment_list = []
    for treatment in treatments:
        treatment_data = {**TreatmentSerializer(treatment).data,
                          "patient": {**UserSerializer(treatment.patient.user).data,
                                      "sex": treatment.patient.user.profile.sex,
                                      },
                          }
        treatment_list.append(treatment_data)
    return Response(treatment_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPatientDetails(request, pk):
    patient = Patient.objects.get(user__id=pk)
    appointments = []
    for appointment in patient.appointment_set.all():
        appointments.append({
            **AppointmentSerializer(appointment).data,
            "doctor_full_name": appointment.doctor.user.get_full_name()
        })
    appointments.reverse()
    patient_data = {
        **UserSerializer(patient.user).data,
        **ProfileSerializer(patient.user.profile).data,
        **PatientSerializer(patient).data,
        "treatments": patient.treatment_set.count(),
        "appointments": appointments,
    }

    return Response(patient_data, status=status.HTTP_200_OK)


@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def addAppointment(request, pk):
    patient = Patient.objects.filter(user__id=pk)
    # print(patient, request.data.get("description"), request.user.doctor)
    if patient.exists():
        appointment = Appointment.objects.create(
            doctor=request.user.doctor, patient=patient.first(), description=request.data.get("description"))
        serializer_appointment = {**AppointmentSerializer(appointment).data,
                                  "doctor_full_name": request.user.get_full_name()}
        return Response(serializer_appointment, status=status.HTTP_201_CREATED)
    return Response({"detail": "cant create appointment"}, status=status.HTTP_400_BAD_REQUEST)
