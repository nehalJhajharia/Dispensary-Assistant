from django.contrib import admin
from .models import MyUser, Doctor, MedicalHistory, Student, Staff
from .models import Patient, Vaccine, Test, MedicineMaster, Medicine
from .models import Treatment, InvestigationTests, Symptoms, Appointment

# Register your models here.
admin.site.register(MyUser)
admin.site.register(Doctor)
admin.site.register(MedicalHistory)
admin.site.register(Student)
admin.site.register(Staff)
admin.site.register(Patient)
admin.site.register(Vaccine)
admin.site.register(Test)
admin.site.register(MedicineMaster)
admin.site.register(Medicine)
admin.site.register(Treatment)
admin.site.register(InvestigationTests)
admin.site.register(Symptoms)
admin.site.register(Appointment)