from rest_framework import serializers
from .models import Patient, Doctor, Appointment

class MyUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    middle_name = serializers.CharField()
    last_name = serializers.CharField()
    mobile_personal = serializers.CharField()
    state = serializers.CharField()
    district = serializers.CharField()
    pincode = serializers.CharField()
    address_line = serializers.CharField()
    patient_or_doc = serializers.BooleanField()
    datetime_of_reg = serializers.DateTimeField()

class PatientSerializer(serializers.Serializer):
    mobile_emergency = serializers.CharField()
    dob = serializers.DateField()
    sex = serializers.CharField()
    blood_group = serializers.CharField()
    staff_or_student = serializers.BooleanField()

class DoctorSerializer(serializers.Serializer):
    degree = serializers.CharField()
    specialization = serializers.CharField()

class StudentSerializer(serializers.Serializer):
    course = serializers.CharField()
    admission_num = serializers.CharField()
    hostel_num_and_name = serializers.CharField()
    room_num = serializers.CharField()
    father_occupation = serializers.CharField()
    mother_occupation = serializers.CharField()
    father_mobile = serializers.CharField()
    mother_mobile = serializers.CharField()

class StaffSerializer(serializers.Serializer):
    staff_or_relative = serializers.BooleanField()
    employee_code = serializers.CharField()

class MedicalHistorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    patient_id = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    hypertension_self = serializers.BooleanField()
    hypertension_father = serializers.BooleanField()
    hypertension_mother = serializers.BooleanField()
    diabetes_self = serializers.BooleanField()
    diabetes_father = serializers.BooleanField()
    diabetes_mother = serializers.BooleanField()
    prev_operation_injury = serializers.CharField()
    chronic_disease = serializers.CharField()
    allergic_medicine = serializers.CharField()

class VaccineSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    patient_id = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    name = serializers.CharField()
    date = serializers.DateField()

class TestSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    appointment_id = serializers.PrimaryKeyRelatedField(queryset=Appointment.objects.all())
    name = serializers.CharField()
    date = serializers.DateField()
    remarks = serializers.CharField()
    image = serializers.ImageField()

class MedicineMasterSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    count = serializers.IntegerField()
    type = serializers.CharField()
    date_of_mfg = serializers.DateField()
    date_of_expiry = serializers.DateField()

class AppointmentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    patient_id = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    doctor_id = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
    datetime = serializers.DateTimeField()
    appointment_created_at = serializers.DateTimeField()
    remarks = serializers.CharField()
    diagnosis_duration_days = serializers.IntegerField()