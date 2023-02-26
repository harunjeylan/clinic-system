from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from main.views import MyTokenObtainPairView
# from views.views import OrderViewSet, ProductViewSet
from main import views


urlpatterns = [
    path("", views.getRoutes, name="get_routes"),
    path("user/profile/", views.getUserData, name="profile"),
    path("user/profile/<pk>/", views.getUserDetails, name="profile-details"),
    path("user/profile/update", views.updateProfile, name="update-profile"),
    path("user/register/", views.userRegister, name="register"),

    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('search-patients/', views.searchPatients, name="searchPatients"),


    path('employ/', views.getEmployees, name="get_employees"),
    path('doctor/', views.getDoctors, name="get_doctors"),
    path('receptor/', views.getReceptors, name="get_receptors"),
    path('patient/', views.getPatients, name="get_patients"),
    path('users/', views.getAllUsers, name="get_users"),



    path('treatment/add/', views.addTreatment, name="add_treatment"),
    path('treatment/treated/', views.setPatientTreated, name="treated_treatment"),

    path('pending-treatment/', views.getPendingTreatment, name="pending_treatment"),
    path('patient/<pk>/', views.getPatientDetails, name="patient_details"),
    path('patient/<pk>/add-appointment',
         views.addAppointment, name="add_appointment"),
    path('user/profile/update_password/',
         views.updatePassword, name='update_password'),

]
