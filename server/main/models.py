from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    country = models.CharField(max_length=50, null=True, blank=True)
    street1 = models.CharField(max_length=100, null=True, blank=True)
    street2 = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    zipcode = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name = "address"

    # ----------------------------------------------------------------------------------

    def natural_key(self):
        return {
            "street": self.street1, "city": self.city, "state": self.state
        }

    def __str__(self):
        return f"{self.street1} | {self.city} | {self.state}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    PHONE_REGEX = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(
        validators=[PHONE_REGEX], max_length=17, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              upload_to="profile-images")
    SEX_CHOSE = [
        ("male", "Male"),
        ("female", "Female"),
    ]
    sex = models.CharField(max_length=20, null=True,
                           blank=True, choices=SEX_CHOSE)
    birthday = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    street1 = models.CharField(max_length=100, null=True, blank=True)
    street2 = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    zipcode = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)

    def natural_key(self):
        return {
            "name": self.user.get_full_name(),
            "email": self.user.email,
            "phone_number": self.phone_number,
            "image": self.image.url,
            "sex": self.sex,
            "birthday": self.birthday,
            "street": self.street1, "city": self.city, "state": self.state,
        }

    def get_image(self):
        if self.image:
            return self.image.url
        else:
            return None

    def __str__(self):
        return f"{self.user.get_full_name()}"


class Receptor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profession = models.CharField(max_length=100, null=True, blank=True)

    def natural_key(self):
        return {
            "user": self.user.get_full_name(),
            "profession": self.profession,
        }

    def __str__(self):
        return f"{self.user.get_full_name()}"


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def natural_key(self):
        return {
            "user": self.user.get_full_name(),
        }

    def __str__(self):
        return f"{self.user.get_full_name()}"


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profession = models.CharField(max_length=100, null=True, blank=True)

    def natural_key(self):
        return {
            "user": self.user.get_full_name(),
            "profession": self.profession,
        }

    def __str__(self):
        return f"{self.user.get_full_name()}"


class Treatment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    STATUS_CHOSE = [
        ("pending", "Pending"),
        ("treated", "Treated"),
    ]
    status = models.CharField(
        max_length=20, choices=STATUS_CHOSE, default="pending", null=True, blank=True)

    def natural_key(self):
        return {
            "patient": self.patient.user.get_full_name(),
            "doctor": self.doctor.user.get_full_name(),
        }

    def __str__(self):
        return f"{self.patient}|{self.doctor}|{self.created}"


class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField()

    def natural_key(self):
        return {
            "patient": self.patient.user.get_full_name(),
            "doctor_": self.doctor.user.get_full_name(),
        }

    def __str__(self):
        return f"{self.patient}|{self.doctor}|{self.created}"
