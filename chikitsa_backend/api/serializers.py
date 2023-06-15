from rest_framework import serializers

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
    age = serializers.IntegerField()
    sex = serializers.CharField()
    blood_group = serializers.CharField()
    staff_or_student = serializers.BooleanField()

class DoctorSerializer(serializers.Serializer):
    degree = serializers.CharField()
    specialization = serializers.CharField()
    experience = serializers.IntegerField()

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
    # patient_id = serializers.IntegerField()
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
    name = serializers.CharField()
    date = serializers.DateField()

class TestSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    date = serializers.DateField()
    remarks = serializers.CharField()
    image = serializers.ImageField()

class MedicineMasterSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    count = serializers.IntegerField()
    date_of_mfg = serializers.DateField()
    date_of_expiry = serializers.DateField()