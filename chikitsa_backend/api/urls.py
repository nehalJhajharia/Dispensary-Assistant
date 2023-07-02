from django.urls import path
from . import views

urlpatterns = [
    path('user/get/', views.getMyUser), # (id)
    path('patient/create/student/', views.createStudent), # (all student details)
    path('patient/create/staff/', views.createStaff), # (all staff details)
    path('patient/get/medical-history/', views.getMedicalHistory), # (patient_id)
    path('patient/update/medical-history/', views.updateMedicalHistory), # (patient_id)
    path('patient/get/vaccines/', views.getVaccines), # (patient_id)
    path('patient/create/vaccine/', views.createNewVaccine), # (patient_id, name, date)
    path('patient/get/tests/', views.getTests), # (appointment_id)
    path('patient/create/test/', views.createNewTest), # (appointment_id, test details)
    path('patient/get/all-tests/', views.getAllTests), # (patient_id)
    path('patient/get/appointments/', views.getAppointmentByPatient), # (patient_id)
    path('patient/create/appointment/', views.createAppointment), # (patient_id, doctor_id, datetime)
    path('doctor/create/', views.createDoctor), # (all doctor details)
    path('doctor/get/appointments/', views.getAppointmentByDoctor), # (doctor_id)
    path('doctor/get/all-medicines/', views.getAllMedicines), # ()
    path('doctor/create/medicine/', views.createNewMedicine), # (all medicine details)
    path('doctor/get/all-doctors/', views.getAllDoctors), # ()
]