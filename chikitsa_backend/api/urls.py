from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.getMyUser), # (id)
    path('patient/create/student/', views.createStudent), # (all student details)
    path('patient/create/staff/', views.createStaff), # (all staff details)
    path('patient/medical-history/', views.getMedicalHistory), # (patient_id)
    path('patient/update/medical-history/', views.updateMedicalHistory), # (patient_id)
    path('patient/vaccines/', views.getVaccines), # (patient_id)
    path('patient/tests/', views.getTests), # (appointment_id)
    path('patient/all-tests/', views.getAllTests), # (patient_id)
    path('patient/appointments/', views.getAppointmentByPatient), # (patient_id)
    path('patient/create/appointment/', views.createAppointment), # (patient_id, doctor_id, datetime)
    path('doctor/create/', views.createDoctor), # (all doctor details)
    path('doctor/appointments/', views.getAppointmentByDoctor), # (doctor_id)
    path('doctor/all-medicines/', views.getAllMedicines), # ()
    path('doctor/create/medicine/', views.createNewMedicine), # (all medicine details)
    path('doctor/all-doctors/', views.getAllDoctors),
]