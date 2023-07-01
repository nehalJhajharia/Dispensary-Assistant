from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.forms.models import model_to_dict
from .models import MyUser, Patient, Doctor, Student, Staff, MedicalHistory
from .models import Vaccine, Test, MedicineMaster, Appointment
from .serializers import MyUserSerializer, PatientSerializer, DoctorSerializer
from .serializers import StudentSerializer, StaffSerializer, MedicalHistorySerializer
from .serializers import VaccineSerializer, TestSerializer, MedicineMasterSerializer
from .serializers import AppointmentSerializer

def getMyUser(request):
    user_id = request.GET.get('id')
    user_data = getMyUserById(user_id)
    return JsonResponse(user_data)

def getMyUserById(user_id):
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

    return user_data

def getPatient(user_id):
    patient = Patient.objects.get(user_id = user_id)
    patient_data = PatientSerializer(patient).data
    return patient_data

def getDoctor(user_id):
    doctor = Doctor.objects.get(user_id = user_id)
    doctor_data = DoctorSerializer(doctor).data
    return doctor_data

def getAllDoctors(request):
    all_doctors = Doctor.objects.all()
    all_doc_data = {}

    for doctor in all_doctors:
        id = doctor.user_id
        doc_data = getMyUserById(id)
        all_doc_data[f'{str(id)}'] = f'{str(doc_data)}'

    return JsonResponse(all_doc_data)

def getStudent(user_id):
    student = Student.objects.get(patient_id = user_id)
    student_data = StudentSerializer(student).data
    return student_data

def getStaff(user_id):
    staff = Staff.objects.get(patient_id = user_id)
    staff_data = StaffSerializer(staff).data
    return staff_data

def getMedicalHistory(request):
    patient = request.GET.get('patient_id')
    medical_history = MedicalHistory.objects.get(patient = patient)
    history_data = MedicalHistorySerializer(medical_history).data
    return JsonResponse(history_data)

def getVaccines(request):
    patient = request.GET.get('patient_id')
    vaccines = Vaccine.objects.filter(patient_id = patient)
    vaccines_data = VaccineSerializer(vaccines, many=True).data
    return JsonResponse({'vaccines_data': vaccines_data})

def createNewVaccine(request):
    try:
        vaccine_data = request.GET
        vaccine = Vaccine()
        patient = Patient.objects.get(user_id = vaccine_data['patient_id'])
        vaccine.patient = patient
        vaccine.name = vaccine_data['name']
        vaccine.date = vaccine_data['date']

        vaccine.save()
        return JsonResponse({'message': 'Vaccine created successfully.'})
    except KeyError as e:
        return JsonResponse({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return JsonResponse({'error': str(e)})

def getTests(request):
    appointment_id = request.GET.get('appointment_id')
    tests = Test.objects.filter(appointment_id = appointment_id)
    tests_data = TestSerializer(tests, many=True).data
    return JsonResponse({'tests_data': tests_data})

def getAllTests(request):
    try:
        patient_id = request.GET.get('patient_id')
        all_appointments = Appointment.objects.filter(patient=patient_id)
        all_tests_data = {}
        for appointment in all_appointments:
            tests = Test.objects.filter(appointment=appointment)
            for test in tests:
                test_data = TestSerializer(test).data
                all_tests_data[str(test.id)] = test_data

        return JsonResponse(all_tests_data)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def getAllMedicines(request):
    all_medicines = MedicineMaster.objects.all()
    all_med_data = MedicineMasterSerializer(all_medicines, many=True).data
    return JsonResponse({'all_med_data': all_med_data})

def createNewMedicine(request):
    try:
        medicine_data = request.GET
        new_medicine = MedicineMaster()
        for field in medicine_data:
            if hasattr(new_medicine, field):
                setattr(new_medicine, field, medicine_data[field])

        new_medicine.save()
        return JsonResponse({'message': 'Medicine created successfully.'})
    except KeyError as e:
        return JsonResponse({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return JsonResponse({'error': str(e)})

def getAppointmentByPatient(request):
    patient_id = request.GET.get('patient_id')
    appointments = Appointment.objects.filter(patient=patient_id)
    appointments_data = AppointmentSerializer(appointments, many=True).data
    print(appointments_data)
    return JsonResponse({'appointments': appointments_data})

def getAppointmentByDoctor(request):
    doctor_id = request.GET.get('doctor_id')
    appointments = Appointment.objects.filter(doctor=doctor_id)
    appointments_data = AppointmentSerializer(appointments, many=True).data
    print(appointments_data)
    return JsonResponse({'appointments': appointments_data})

def getNewMyUser(request):
    user_data = request.GET

    try:
        new_user = MyUser()

        for field in user_data:
                if hasattr(new_user, field):
                    setattr(new_user, field, user_data[field])

        new_user.save()
        return new_user
    except KeyError as e:
        return JsonResponse({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return JsonResponse({'error': str(e)})

def createDoctor(request):
    doctor_data = request.GET
    user = getNewMyUser(request)
    if type(user) is MyUser:
        print('user created')
        try:
            new_doctor = Doctor()
            new_doctor.user = user

            for field in doctor_data:
                if hasattr(new_doctor, field):
                    setattr(new_doctor, field, doctor_data[field])

            new_doctor.save()
            return JsonResponse({'message': 'Doctor created successfully'})
        except KeyError as e:
            user.delete()
            return JsonResponse({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            user.delete()
            return JsonResponse({'error': str(e)})
    else:
        return user

def getNewPatient(request):
    patient_data = request.GET
    user = getNewMyUser(request)
    if type(user) is MyUser:
        print('user created')
        try:
            new_patient = Patient()
            new_patient.user = user

            for field in patient_data:
                if hasattr(new_patient, field):
                    setattr(new_patient, field, patient_data[field])

            new_patient.save()
            return new_patient, user
        except KeyError as e:
            user.delete()
            return JsonResponse({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            user.delete()
            return JsonResponse({'error': str(e)})
    else:
        return user

def createStudent(request):
    student_data = request.GET
    patient, user = getNewPatient(request)
    if type(patient) is Patient:
        print('patient created')
        try:
            new_student = Student()
            new_student.patient = patient

            for field in student_data:
                if hasattr(new_student, field):
                    setattr(new_student, field, student_data[field])

            new_student.save()
            return JsonResponse({'message': 'Student created successfully'})
        except KeyError as e:
            user.delete()
            return JsonResponse({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            return JsonResponse({'error': str(e)})
    else:
        return patient
    
def createStaff(request):
    staff_data = request.GET
    patient, user = getNewPatient(request)
    if type(patient) is Patient:
        print('patient created')
        try:
            new_staff = Staff()
            new_staff.patient = patient

            for field in staff_data:
                if hasattr(new_staff, field):
                    setattr(new_staff, field, staff_data[field])

            new_staff.save()
            return JsonResponse({'message': 'Staff created successfully'})
        except KeyError as e:
            user.delete()
            return JsonResponse({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            return JsonResponse({'error': str(e)})
    else:
        return patient

def updateMedicalHistory(request):
    med_hist_data = request.GET
    patient_id = med_hist_data.get('patient_id')
    patient_exists = Patient.objects.filter(pk=patient_id).exists()

    if (patient_exists is False):
        return JsonResponse({'message': 'Patient does not exist!!'})
    
    try:
        patient = Patient.objects.get(user_id=patient_id)
        prev_med = MedicalHistory.objects.filter(patient=patient).exists()
        med_hist = MedicalHistory()
        operation = 'created'
        if prev_med:
            operation = 'updated'
            med_hist = MedicalHistory.objects.get(patient=patient)

        med_hist.patient = patient

        for field in med_hist_data:
            if hasattr(med_hist, field):
                setattr(med_hist, field, med_hist_data[field])

        med_hist.save()
        return JsonResponse({'message': f'Medical history {operation}'})
    except KeyError as e:
        return JsonResponse({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return JsonResponse({'error': str(e)})

def createAppointment(request):
    try:
        appointment_data = request.GET
        patient_id = appointment_data['patient_id']
        doctor_id = appointment_data['doctor_id']
        appointment = Appointment()
        patient = Patient.objects.get(user_id=patient_id)
        doctor = Doctor.objects.get(user_id=doctor_id)

        appointment.patient = patient
        appointment.doctor = doctor
        appointment.datetime = appointment_data['datetime']

        appointment.save()
        return JsonResponse({'message': 'Appointment created successfully.'})
    except KeyError as e:
        return JsonResponse({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return JsonResponse({'error': str(e)})
