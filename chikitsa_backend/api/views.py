from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import MyUser, Patient, Doctor, Student, Staff, MedicalHistory
from .models import Vaccine, Test, MedicineMaster, Appointment
from .serializers import MyUserSerializer, PatientSerializer, DoctorSerializer
from .serializers import StudentSerializer, StaffSerializer, MedicalHistorySerializer
from .serializers import VaccineSerializer, TestSerializer, MedicineMasterSerializer
from .serializers import AppointmentSerializer

def getMyUser(request):
    user_id = request.GET.get('id')
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
    appointment_id = request.GET.get('appointment_id')
    tests = Test.objects.filter(appointment_id = appointment_id)
    tests_data = TestSerializer(tests, many=True).data
    return JsonResponse({'tests_data': tests_data})

def getAllMedicines(request):
    all_medicines = MedicineMaster.objects.all()
    all_med_data = MedicineMasterSerializer(all_medicines, many=True).data
    return JsonResponse({'all_med_data': all_med_data})

def getAppointmentByPatient(request):
    patient_id = request.GET.get('patient_id')
    appointments = Appointment.objects.filter(patient_id=patient_id)
    appointments_data = AppointmentSerializer(appointments, many=True).data
    print(appointments_data)
    return JsonResponse({'appointments': appointments_data})

def getAppointmentByDoctor(request):
    doctor_id = request.GET.get('doctor_id')
    appointments = Appointment.objects.filter(doctor_id=doctor_id)
    appointments_data = AppointmentSerializer(appointments, many=True).data
    print(appointments_data)
    return JsonResponse({'appointments': appointments_data})