from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import MyUser, Patient, Doctor, Student, Staff, Appointment, MedicineMaster
from .models import MedicalHistory, Vaccine, Test, Symptoms, Medicine, TestMaster, VaccineMaster

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
    patient_first_name = ReadOnlyField(source='patient.user.first_name')
    patient_last_name = ReadOnlyField(source='patient.user.last_name')
    doctor_first_name = ReadOnlyField(source='doctor.user.first_name')
    doctor_last_name = ReadOnlyField(source='doctor.user.last_name')

    class Meta:
        model = Appointment
        fields = '__all__'

class SymptomsSerializer(ModelSerializer):
    class Meta:
        model = Symptoms
        fields = '__all__'

class MedicineSerializer(ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'

class TestMasterSerializer(ModelSerializer):
    class Meta:
        model = TestMaster
        fields = '__all__'

class VaccineMasterSerializer(ModelSerializer):
    class Meta:
        model = VaccineMaster
        fields = '__all__'