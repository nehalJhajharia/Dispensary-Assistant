from rest_framework.serializers import ModelSerializer
from .models import MyUser, Patient, Doctor, Student, Staff, Appointment, MedicineMaster
from .models import MedicalHistory, Vaccine, Test

class MyUserSerializer(ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'

class PatientSerializer(ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class DoctorSerializer(ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class StaffSerializer(ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class MedicalHistorySerializer(ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = '__all__'

class VaccineSerializer(ModelSerializer):
    class Meta:
        model = Vaccine
        fields = '__all__'

class TestSerializer(ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

class MedicineMasterSerializer(ModelSerializer):
    class Meta:
        model = MedicineMaster
        fields = '__all__'

class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'