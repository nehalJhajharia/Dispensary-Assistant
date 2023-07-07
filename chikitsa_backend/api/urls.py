from django.urls import path
from . import views

urlpatterns = [
    path('user/get/', views.getMyUser), # (id)
    path('patient/create/student/', views.createStudent), # (all student details)
    path('patient/create/staff/', views.createStaff), # (all staff details)
    path('patient/get/medical-history/', views.getMedicalHistory), # (patient_id)
    path('patient/create/medical-history/', views.createMedicalHistory), # (patient_id)
    path('patient/get/vaccines/', views.getVaccines), # (patient_id)
    path('patient/create/vaccine/', views.createNewVaccine), # (patient_id, name, date)
    path('patient/get/tests/', views.getTests), # (appointment_id)
    path('patient/create/test/', views.createNewTest), # (appointment_id, test details)
    path('patient/get/all-tests/', views.getTestsByPatient), # (patient_id)
    path('patient/get/appointments/', views.getAppointmentByPatient), # (patient_id)
    path('patient/create/appointment/', views.createAppointment), # (patient_id, doctor_id, datetime)
    path('doctor/create/', views.createDoctor), # (all doctor details)
    path('doctor/get/appointments/', views.getAppointmentByDoctor), # (doctor_id)
    path('doctor/get/all-doctors/', views.getAllDoctors), # ()
    path('appointment/get/details/', views.getAppointmentDetails), # (appointment_id)
    path('doctor/update/appointment-status/', views.updateAppointmentStatus), # (appointment_id, status)
    path('doctor/update/symptoms/', views.updateSymptoms), # (symptoms_id, symptoms details)
    path('master/get/all-medicines/', views.getAllMedicines), # ()
    path('master/get/all-tests/', views.getAllTests), #()
    path('master/get/all-vaccines/', views.getAllVaccines), #()
    path('master/create/medicine/', views.createNewMedicineMater), # (medicine details)
    path('master/create/test/', views.createNewMedicineMater), # (test details)
    path('master/create/vaccine/', views.createNewMedicineMater), # (vaccine details)
]