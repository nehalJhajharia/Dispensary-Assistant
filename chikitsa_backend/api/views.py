from django.http import JsonResponse
from .models import MyUser, Patient, Doctor, Student, Staff, MedicalHistory
from .models import Vaccine, Test, MedicineMaster
from .serializers import MyUserSerializer, PatientSerializer, DoctorSerializer
from .serializers import StudentSerializer, StaffSerializer, MedicalHistorySerializer
from .serializers import VaccineSerializer, TestSerializer, MedicineMasterSerializer

def getMyUser(request):
    user_id = request.GET.get('id')
    # user_id = 3
    user = MyUser.objects.get(id = user_id)
    user_data = MyUserSerializer(user).data

    if (user_data['patient_or_doc']):
        patient_data = getPatient(user_id)
        user_data.update(patient_data)

        if (patient_data['staff_or_student']):
            staff_data = getStaff(user_id)
            user_data.update(staff_data)
        else:
            student_data = getStudent(user_id)
            user_data.update(student_data)

    else:
        doctor_data = getDoctor(user_id)
        user_data.update(doctor_data)

    return JsonResponse(user_data)

def getPatient(user_id):
    patient = Patient.objects.get(user_id = user_id)
    patient_data = PatientSerializer(patient).data
    return patient_data

def getDoctor(user_id):
    doctor = Doctor.objects.get(user_id = user_id)
    doctor_data = DoctorSerializer(doctor).data
    return doctor_data

def getStudent(user_id):
    student = Student.objects.get(patient_id = user_id)
    student_data = StudentSerializer(student).data
    return student_data

def getStaff(user_id):
    staff = Staff.objects.get(patient_id = user_id)
    staff_data = StaffSerializer(staff).data
    return staff_data

def getMedicalHistory(request):
    patient_id = request.GET.get('patient_id')
    medical_history = MedicalHistory.objects.get(patient_id = patient_id)
    history_data = MedicalHistorySerializer(medical_history).data
    return JsonResponse(history_data)

def getVaccines(request):
    patient_id = request.GET.get('patient_id')
    vaccines = Vaccine.objects.filter(patient_id = patient_id)
    vaccines_data = VaccineSerializer(vaccines, many=True).data
    return JsonResponse({'vaccines_data': vaccines_data})

def getTests(request):
    patient_id = request.GET.get('patient_id')
    tests = Test.objects.filter(patient_id = patient_id)
    tests_data = TestSerializer(tests, many=True).data
    return JsonResponse({'tests_data': tests_data})

def getAllMedicines(request):
    all_medicines = MedicineMaster.objects.all()
    all_med_data = MedicineMasterSerializer(all_medicines, many=True).data
    return JsonResponse({'all_med_data': all_med_data})
