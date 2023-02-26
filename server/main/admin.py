from django.contrib import admin

# Register your models here.
from main.models import Receptor, Doctor, Profile, Patient, Appointment, Treatment


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user',
                    'image',
                    'sex',
                    'birthday',
                    'country',
                    'street1',
                    'street2',
                    'city',
                    'zipcode',
                     "position",
                    'state',)
    list_filter = ('user',)


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'profession')
    list_filter = ('user',)


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', )
    list_filter = ('user',)


@admin.register(Receptor)
class ReceptorAdmin(admin.ModelAdmin):
    list_display = ('user',)
    list_filter = ('user',)


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("doctor",
                    "patient",
                    "created")
    list_filter = ('patient',)


@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient',  'created', 'status')
    list_filter = ('patient',)
