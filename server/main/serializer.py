from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validators
from main.models import Receptor, Doctor, Profile, Patient, Appointment, Treatment
# ===========================================================================


class RegistrationSerializer(serializers.ModelSerializer):
    # first_name = serializers.CharField()
    # last_name = serializers.CharField()
    # username = serializers.CharField()
    # password = serializers.CharField(
    #     style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password']


# ===========================================================================


class PassChangeFormSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(
        required=True, style={'input_type': 'password'}, write_only=True)
    new_password = serializers.CharField(
        required=True, style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['old_password', 'new_password']
        extra_kwargs = {
            'old_password': {'write_only': True},
            'new_password': {'write_only': True},
        }

# ===========================================================================


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("__all__")

# ===========================================================================


class UpdateProfileFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["phone_number", "sex", "birthday", "position",
                  "country", "street1", "street2", "city", "zipcode", "state"]
# ===========================================================================


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name",
                  "email", "username", "is_superuser"]

# ===========================================================================


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = "__all__"

# ===========================================================================


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"

# ===========================================================================


class ReceptorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptor
        fields = "__all__"

# ===========================================================================


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


# ===========================================================================
class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = "__all__"
