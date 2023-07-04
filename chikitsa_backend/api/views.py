from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.exceptions import ValidationError
from django.forms.models import model_to_dict
from .models import MyUser, Patient, Doctor, Student, Staff, MedicalHistory
from .models import Vaccine, Test, MedicineMaster, Appointment, Symptoms, Medicine
from .serializers import MyUserSerializer, PatientSerializer, DoctorSerializer
from .serializers import StudentSerializer, StaffSerializer, MedicalHistorySerializer
from .serializers import VaccineSerializer, TestSerializer, MedicineMasterSerializer
from .serializers import AppointmentSerializer, SymptomsSerializer, MedicineSerializer

def convertBooleans(data):
    new_data = {}
    for field in data:
        if data[field] == 'false':
            new_data[field] = 'False'
        elif data[field] == 'true':
            new_data[field] = 'True'
        else:
            new_data[field] = data[field]
    return new_data

@api_view(['GET'])
def getMyUser(request):
    user_id = request.GET.get('id')
    user_data = getMyUserById(user_id)
    return Response(user_data)

def getMyUserById(user_id):
    user = MyUser.objects.get(id = user_id)
    user_data = MyUserSerializer(user).data

    if (user_data['patient_or_doc']):
        patient_data = getPatient(user)
        user_data.update(patient_data)

        if (patient_data['staff_or_student']):
            staff_data = getStaff(user_id)
            user_data.update(staff_data)
        else:
            student_data = getStudent(user_id)
            user_data.update(student_data)

    else:
        doctor_data = getDoctor(user)
        user_data.update(doctor_data)

    return user_data

def getPatient(user):
    patient = Patient.objects.get(user = user)
    patient_data = PatientSerializer(patient).data
    return patient_data

def getDoctor(user):
    doctor = Doctor.objects.get(user = user)
    doctor_data = DoctorSerializer(doctor).data
    return doctor_data

@api_view(['GET'])
def getAllDoctors(request):
    all_doctors = Doctor.objects.all()
    all_doc_data = {}

    for doctor in all_doctors:
        id = doctor.user_id
        doc_data = getMyUserById(id)
        all_doc_data[f'{str(id)}'] = f'{str(doc_data)}'

    return Response(all_doc_data)

def getStudent(user_id):
    student = Student.objects.get(patient = user_id)
    student_data = StudentSerializer(student).data
    return student_data

def getStaff(user_id):
    staff = Staff.objects.get(patient = user_id)
    staff_data = StaffSerializer(staff).data
    return staff_data

@api_view(['GET'])
def getMedicalHistory(request):
    patient = request.GET.get('patient_id')
    medical_history = MedicalHistory.objects.get(patient = patient)
    history_data = MedicalHistorySerializer(medical_history).data
    return Response(history_data)

@api_view(['GET'])
def getVaccines(request):
    patient = request.GET.get('patient_id')
    vaccines = Vaccine.objects.filter(patient_id = patient)
    vaccines_data = VaccineSerializer(vaccines, many=True).data
    return Response({'vaccines_data': vaccines_data})

@api_view(['POST'])
def createNewVaccine(request):
    try:
        data = request.data
        patient = Patient.objects.get(user_id = data['patient_id'])
        Vaccine.objects.create(
            patient = patient,
            name = data['name'],
            date = data['date']
        )
        return Response({'message': 'Vaccine created successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

@api_view(['POST'])
def createNewTest(request):
    try:
        data = request.data
        appointment = Appointment.objects.get(id=data['appointment_id'])

        Test.objects.create(
            appointment = appointment,
            name = data['name'],
            date = data['date'],
            remarks = data['remarks'],
            image = data['image']
        )
        return Response({'message': 'Test created successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

@api_view(['GET'])
def getTests(request):
    appointment_id = request.GET.get('appointment_id')
    appointment = Appointment.objects.get(id=appointment_id)
    return Response({'tests_data': getTestsData(appointment)})

@api_view(['GET'])
def getAllTests(request):
    try:
        patient_id = request.GET.get('patient_id')
        all_appointments = Appointment.objects.filter(patient=patient_id)
        all_tests_data = []
        for appointment in all_appointments:
            tests = Test.objects.filter(appointment=appointment)
            for test in tests:
                test_data = TestSerializer(test).data
                all_tests_data.append(test_data)

        return Response({'all_tests_data': all_tests_data})

    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def getAllMedicines(request):
    all_medicines = MedicineMaster.objects.all()
    all_med_data = MedicineMasterSerializer(all_medicines, many=True).data
    return Response([{'all_med_data': all_med_data}])

@api_view(['POST'])
def createNewMedicine(request):
    try:
        medicine_data = request.data
        new_medicine = MedicineMaster()
        for field in medicine_data:
            if hasattr(new_medicine, field):
                setattr(new_medicine, field, medicine_data[field])

        new_medicine.save()
        return Response({'message': 'Medicine created successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

@api_view(['GET'])
def getAppointmentByPatient(request):
    patient_id = request.GET.get('patient_id')
    appointments = Appointment.objects.filter(patient=patient_id)
    appointments_data = AppointmentSerializer(appointments, many=True).data
    return Response({'appointments': appointments_data})

@api_view(['GET'])
def getAppointmentByDoctor(request):
    doctor_id = request.GET.get('doctor_id')
    appointments = Appointment.objects.filter(doctor=doctor_id)
    appointments_data = AppointmentSerializer(appointments, many=True).data
    return Response({'appointments': appointments_data})

def getNewMyUser(request):
    try:
        user_data = request.data
        new_user = MyUser()

        for field in user_data:
                if hasattr(new_user, field):
                    setattr(new_user, field, user_data[field])

        new_user.save()
        return new_user
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

@api_view(['POST'])
def createDoctor(request):
    doctor_data = request.data
    user = getNewMyUser(request)
    if type(user) is MyUser:
        try:
            new_doctor = Doctor()
            new_doctor.user = user

            for field in doctor_data:
                if hasattr(new_doctor, field):
                    setattr(new_doctor, field, doctor_data[field])

            new_doctor.save()
            return Response({'message': 'Doctor created successfully'})
        except KeyError as e:
            user.delete()
            return Response({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            user.delete()
            return Response({'error': str(e)})
    else:
        return user

def getNewPatient(request):
    patient_data = request.data
    user = getNewMyUser(request)
    if type(user) is MyUser:
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
            return Response({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            user.delete()
            return Response({'error': str(e)})
    else:
        return user

@api_view(['POST'])
def createStudent(request):
    student_data = request.data
    patient, user = getNewPatient(request)
    if type(patient) is Patient:
        try:
            new_student = Student()
            new_student.patient = patient

            for field in student_data:
                if hasattr(new_student, field):
                    setattr(new_student, field, student_data[field])

            new_student.save()
            return Response({'message': 'Student created successfully'})
        except KeyError as e:
            user.delete()
            return Response({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            return Response({'error': str(e)})
    else:
        return patient
    
@api_view(['POST'])
def createStaff(request):
    staff_data = request.data
    patient, user = getNewPatient(request)
    if type(patient) is Patient:
        try:
            new_staff = Staff()
            new_staff.patient = patient

            for field in staff_data:
                if hasattr(new_staff, field):
                    setattr(new_staff, field, staff_data[field])

            new_staff.save()
            return Response({'message': 'Staff created successfully'})
        except KeyError as e:
            user.delete()
            return Response({'error': f'Missing required field: {str(e)}'})
        except ValidationError as e:
            return Response({'error': str(e)})
    else:
        return patient

@api_view(['POST'])
def createMedicalHistory(request):
    try:
        data = request.data
        patient_id = data.get('patient_id')
        
        patient = Patient.objects.get(user_id=patient_id)
        prev_med = MedicalHistory.objects.filter(patient=patient).exists()
        if prev_med:
            return Response({'error': 'Medical history already exists!!'})

        med_hist = MedicalHistory()
        med_hist.patient = patient
        for field in data:
            if hasattr(med_hist, field):
                setattr(med_hist, field, data[field])

        med_hist.save()
        return Response({'message': 'Medical history created successfully'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

@api_view(['POST'])
def createAppointment(request):
    try:
        data = convertBooleans(request.data)
        # data = request.data
        patient_id = data['patient_id']
        doctor_id = data['doctor_id']
        patient = Patient.objects.get(user_id=patient_id)
        doctor = Doctor.objects.get(user_id=doctor_id)
        appointment = Appointment.objects.create(
            patient = patient,
            doctor = doctor,
            datetime = data['datetime']
        )

        symptoms_created, response = createSymptoms(data, appointment)
        print(symptoms_created)
        if not symptoms_created:
            appointment.delete()
        
        return response
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

def createSymptoms(data, appointment):
    try:
        print(data)
        symptoms = Symptoms()
        symptoms.appointment = appointment
        for field in data:
            if hasattr(symptoms, field):
                setattr(symptoms, field, data[field])

        symptoms.save()
        return True, Response({'message': 'Appointment created successfully.'})
    except KeyError as e:
        return False, Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return False, Response({'error': str(e)})

def getMedicines(appointment):
    medicines = Medicine.objects.filter(appointment=appointment)
    return MedicineSerializer(medicines, many=True).data

def getTestsData(appointment):
    tests = Test.objects.filter(appointment=appointment)
    return TestSerializer(tests, many=True).data

def getSymptoms(appointment):
    symptoms = Symptoms.objects.get(appointment=appointment)
    return SymptomsSerializer(symptoms, many=False).data

@api_view(['GET'])
def getAppointmentDetails(request):
    appointment_id = request.GET.get('appointment_id')
    appointment = Appointment.objects.get(id=appointment_id)
    details = AppointmentSerializer(appointment, many=False).data
    details['symptoms'] = getSymptoms(appointment)
    details['medicines'] = getMedicines(appointment)
    details['tests'] = getTestsData(appointment)
    return Response(details)