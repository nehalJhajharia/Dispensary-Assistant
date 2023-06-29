from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.getMyUser),
    path('all-medicines/', views.getAllMedicines),
    path('patient/medical-history/', views.getMedicalHistory),
    path('patient/update/medical-history/', views. updateMedicalHistory),
    path('patient/vaccines/', views.getVaccines),
    path('patient/tests/', views.getTests),
    path('patient/appointments/', views.getAppointmentByPatient),
    path('patient/create/student/', views.createStudent),
    path('patient/create/staff/', views.createStaff),
    path('doctor/appointments/', views.getAppointmentByDoctor),
    path('doctor/create/', views.createDoctor),
]