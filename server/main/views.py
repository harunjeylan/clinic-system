from main.models import Receptor, Doctor, Profile, Patient, Appointment, Treatment
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
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.http import JsonResponse
from main.utils import get_tokens_for_user
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.contrib.auth import update_session_auth_hash
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.db.models import Count
from django.contrib.auth.hashers import make_password
# ===========================================================================

# ===========================================================================
# ===========================================================================
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
    serializer_register_form = RegistrationSerializer(data=request.data)
    if serializer_register_form.is_valid():
        username = request.data["username"]
        password = request.data["password"]
        user = serializer_register_form.save()
        user.set_password(password)
        user.save()
        auth_data = get_tokens_for_user(user)
        userSerializer = UserSerializer(user)
        auth_data["user"] = userSerializer.data
        return Response(auth_data, status=status.HTTP_201_CREATED)
    return Response({"detail": serializer_register_form.errors}, status=status.HTTP_400_BAD_REQUEST)

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
            **profileSerializer.data,
            **userSerializer.data,
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserDetails(request, pk):
    user = User.objects.get(id=pk)
    userSerializer = UserSerializer(user)
    profile, is_profile_created = Profile.objects.get_or_create(
        user=user)
    profileSerializer = ProfileSerializer(profile)
    absolute_image_url = request.build_absolute_uri(user.profile.get_image(
    )) if user.profile.get_image() != None else None
    data = {
        "user": {
            **profileSerializer.data,
            **userSerializer.data,
            "image": absolute_image_url
        }
    }
    if Doctor.objects.filter(user=user).exists():
        data["user"]["is_doctor"] = True
    elif Receptor.objects.filter(user=user).exists():
        data["user"]["is_receptor"] = True
    else:
        data["user"]["is_patient"] = True

    return Response(data)

# ===========================================================================


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    user = User.objects.get(id=request.data.get("user"))
    print(user.username)
    profile, created = Profile.objects.get_or_create(
        user=user
    )
    serializer_profile_form = UpdateProfileFormSerializer(
        data=request.data, instance=profile)
    serializer_user_form = UserSerializer(
        data=request.data, instance=user)
    user_data = {}
    if serializer_profile_form.is_valid() and serializer_user_form.is_valid():
        print(request.data)
        user = serializer_user_form.save()
        profile = serializer_profile_form.save()

    else:
        print(">>>>>>>>>>>>>>>>>>>")
        return Response({**serializer_profile_form.errors, **serializer_user_form.errors}, status=status.HTTP_400_BAD_REQUEST)
    if request.data.get("position") == "doctor":
        doctor, created = Doctor.objects.get_or_create(
            user=user,
        )
        doctor.profession = request.data.get("profession")
        doctor.save()
        user_data = {**user_data, **DoctorSerializer(doctor).data}

    if request.data.get("position") == "receptor":
        receptor, created = Receptor.objects.get_or_create(
            user=user,
        )
        receptor.profession = request.data.get("profession")
        receptor.save()
        user_data = {**user_data, **ReceptorSerializer(receptor).data}

    return Response({**user_data, **ProfileSerializer(profile).data, **UserSerializer(user).data}, status=status.HTTP_201_CREATED)


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
def getEmployees(request):
    admins = User.objects.filter(is_superuser=True).defer()
    doctors = User.objects.filter(
        doctor__in=Doctor.objects.all()
    ).exclude(id__in=admins)
    receptors = User.objects.filter(
        receptor__in=Receptor.objects.all()
    ).exclude(id__in=(admins | doctors))

    employees_list = []
    for user in doctors:
        doctors_data = {
            **ProfileSerializer(user.profile).data,
            **DoctorSerializer(user.doctor).data,
            **UserSerializer(user).data,
            "is_doctor": True,
            "position": "doctor",
        }
        employees_list.append(doctors_data)
    for user in receptors:
        receptor_data = {
            **ProfileSerializer(user.profile).data,
            **ReceptorSerializer(user.receptor).data,
            **UserSerializer(user).data,
            "is_receptor": True,
            "position": "receptor",
        }
        employees_list.append(receptor_data)
    for admin in admins:
        admin_data = {
            **ProfileSerializer(admin.profile).data,
            **UserSerializer(admin).data,
            "position": "admin",
        }
        employees_list.append(admin_data)
    return Response(employees_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDoctors(request):
    doctors = Doctor.objects.all()
    doctors_list = []
    for doctor in doctors:
        doctor_data = {
            **ProfileSerializer(doctor.user.profile).data,
            **DoctorSerializer(doctor).data,
            **UserSerializer(doctor.user).data,
            "pending_treatments": doctor.treatment_set.filter(status="pending").count(),
            "treated_treatments": doctor.treatment_set.filter(status="treated").count()
        }
        doctors_list.append(doctor_data)

    return Response(doctors_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReceptors(request):
    receptors = Receptor.objects.all()
    receptors_list = []
    for receptor in receptors:
        receptor_data = {
            **ProfileSerializer(receptor.user.profile).data,
            **ReceptorSerializer(receptor).data,
            **UserSerializer(receptor.user).data,
        }
        receptors_list.append(receptor_data)

    return Response(receptors_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPatients(request):
    patients = Patient.objects.all()
    patients_list = []
    for patient in patients:
        patient_data = {
            **ProfileSerializer(patient.user.profile).data,
            **PatientSerializer(patient).data,
            **UserSerializer(patient.user).data,
        }
        patients_list.append(patient_data)

    return Response(patients_list, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllUsers(request):
    users = User.objects.all()
    users_list = []
    for user in users:
        user_data = {
            **ProfileSerializer(user.profile).data,
            **UserSerializer(user).data,
        }
        users_list.append(user_data)
    num_admin = User.objects.filter(is_superuser=True).count()
    num_doctors = Doctor.objects.count()
    num_receptors = Receptor.objects.count()
    num_patients = User.objects.count() - (num_doctors + num_receptors)

    num_treatments = Treatment.objects.count()
    num_appointments = Appointment.objects.count()

    context = {
        "users": users_list,
        "num_admin": num_admin,
        "num_doctors": num_doctors,
        "num_patients": num_patients,
        "num_receptors": num_receptors,
        "num_treatments": num_treatments,
        "num_appointments": num_appointments,
    }
    return Response(context, status=status.HTTP_200_OK)


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
    for user in patients:
        patient_data = {
            **ProfileSerializer(user.profile).data,
            **PatientSerializer(user.patient).data,
            **UserSerializer(user).data,
            "treatments": user.patient.treatment_set.count(),
            "appointments": user.patient.appointment_set.count(),
        }
        print(user.id)
        patients_list.append(patient_data)
    print(patients_list)
    return Response(patients_list, status=status.HTTP_200_OK)


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
    print(request.user.id, pk)
    user = User.objects.get(id=pk)
    patient, created = Patient.objects.get_or_create(user=user)
    appointments = []
    treatments = []
    if not created:
        for appointment in patient.appointment_set.all():
            appointments.append({
                **AppointmentSerializer(appointment).data,
                "doctor_full_name": appointment.doctor.user.get_full_name()
            })
        for treatment in patient.treatment_set.all():
            treatments.append({
                **TreatmentSerializer(treatment).data,
                "doctor_full_name": treatment.doctor.user.get_full_name()
            })
        print(patient.appointment_set.all())

    appointments.reverse()
    patient_data = {
        **ProfileSerializer(patient.user.profile).data,
        **PatientSerializer(patient).data,
        **UserSerializer(patient.user).data,
        "treatments": treatments,
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
