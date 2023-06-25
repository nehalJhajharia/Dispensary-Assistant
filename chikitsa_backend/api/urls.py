from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.getMyUser),
    path('all-medicines/', views.getAllMedicines),
    path('patient/medical-history/', views.getMedicalHistory),
    path('patient/vaccines/', views.getVaccines),
    path('patient/tests/', views.getTests),
    path('patient/appointments/', views.getAppointmentByPatient),
    path('doctor/appointments/', views.getAppointmentByDoctor),
]