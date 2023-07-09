from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.exceptions import ValidationError
from django.forms.models import model_to_dict
from .models import MyUser, Patient, Doctor, Student, Staff, MedicalHistory
from .models import Vaccine, Test, MedicineMaster, Appointment, Symptoms, Medicine
from .models import TestMaster, VaccineMaster
from .serializers import MyUserSerializer, PatientSerializer, DoctorSerializer
from .serializers import StudentSerializer, StaffSerializer, MedicalHistorySerializer
from .serializers import VaccineSerializer, TestSerializer, MedicineMasterSerializer
from .serializers import AppointmentSerializer, SymptomsSerializer, MedicineSerializer
from .serializers import TestMasterSerializer, VaccineMasterSerializer

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

####################### GET #######################

@api_view(['GET'])
def getMyUser(request):
    try:
        user_id = request.GET.get('id')
        user_data = getMyUserById(user_id)
        return Response(user_data)
    except:
        return Response({'error': 'User not found!!'})

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
    try:
        all_doctors = Doctor.objects.all()
        all_doc_data = {}

        for doctor in all_doctors:
            id = doctor.user_id
            doc_data = getMyUserById(id)
            all_doc_data[f'{str(id)}'] = f'{str(doc_data)}'

        return Response(all_doc_data)
    except:
        return Response({'error': 'No doctor data!!'})

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
    try:
        patient = request.GET.get('patient_id')
        medical_history = MedicalHistory.objects.get(patient = patient)
        history_data = MedicalHistorySerializer(medical_history).data
        return Response(history_data)
    except:
        return Response({'error': 'Medical History does not exist!!'})

@api_view(['GET'])
def getVaccines(request):
    try:
        patient = request.GET.get('patient_id')
        vaccines = Vaccine.objects.filter(patient_id = patient)
        vaccines_data = VaccineSerializer(vaccines, many=True).data
        return Response({'vaccines_data': vaccines_data})
    except:
        return Response({'error': 'Vaccine data does not exist!!'})

@api_view(['GET'])
def getTests(request):
    try:
        appointment_id = request.GET.get('appointment_id')
        appointment = Appointment.objects.get(id=appointment_id)
        return Response({'tests_data': getTestsData(appointment)})
    except:
        return Response({'error': 'Test data does not exist!!'})

@api_view(['GET'])
def getTestsByPatient(request):
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
    try:
        all_medicines = MedicineMaster.objects.all()
        all_med_data = MedicineMasterSerializer(all_medicines, many=True).data
        return Response([{'all_med_data': all_med_data}])
    except:
        return Response({'error': 'Medicine data does not exist!!'})

@api_view(['GET'])
def getAllTests(request):
    try:
        all_tests = TestMaster.objects.all()
        data = TestMasterSerializer(all_tests, many=True).data
        return Response([{'all_tests_data': data}])
    except:
        return Response({'error': 'Test data does not exist!!'})

@api_view(['GET'])
def getAllVaccines(request):
    try:
        all_vaccines = VaccineMaster.objects.all()
        data = VaccineMasterSerializer(all_vaccines, many=True).data
        return Response([{'all_vaccines_data': data}])
    except:
        return Response({'error': 'Vaccine data does not exist!!'})

@api_view(['GET'])
def getAppointmentByPatient(request):
    try:
        patient_id = request.GET.get('patient_id')
        appointments = Appointment.objects.filter(patient=patient_id)
        appointments_data = AppointmentSerializer(appointments, many=True).data
        return Response({'appointments': appointments_data})
    except:
        return Response({'error': 'Appointment does not exist!!'})

@api_view(['GET'])
def getAppointmentByDoctor(request):
    try:
        doctor_id = request.GET.get('doctor_id')
        appointments = Appointment.objects.filter(doctor=doctor_id)
        appointments_data = AppointmentSerializer(appointments, many=True).data
        return Response({'appointments': appointments_data})
    except:
        return Response({'error': 'Appointment does not exist!!'})

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
    try:
        appointment_id = request.GET.get('appointment_id')
        appointment = Appointment.objects.get(id=appointment_id)
        details = AppointmentSerializer(appointment, many=False).data
        details['symptoms'] = getSymptoms(appointment)
        details['medicines'] = getMedicines(appointment)
        details['tests'] = getTestsData(appointment)
        return Response(details)
    except:
        return Response({'error': 'Appointment does not exist!!'})

####################### POST #######################

@api_view(['POST'])
def createNewVaccine(request):
    try:
        data = convertBooleans(request.data)
        patient = Patient.objects.get(user_id = data['patient_id'])
        vaccine_master = VaccineMaster.objects.get(id = data['vaccine_master_id'])

        Vaccine.objects.create(
            patient = patient,
            vaccine_master = vaccine_master,
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
        data = convertBooleans(request.data)
        appointment = Appointment.objects.get(id=data['appointment_id'])
        test_master = TestMaster.objects.get(id=data['test_master_id'])

        Test.objects.create(
            appointment = appointment,
            test_master = test_master,
            date = data['date'],
            remarks = data['remarks'],
            # image = data['image']
        )
        return Response({'message': 'Test created successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})
    
@api_view(['POST'])
def createNewMedicineMater(request):
    try:
        medicine_data = convertBooleans(request.data)
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
    
def getNewMyUser(request):
    try:
        data = convertBooleans(request.data)
        new_user = MyUser()

        for field in data:
                if hasattr(new_user, field):
                    setattr(new_user, field, data[field])

        new_user.save()
        return new_user
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

@api_view(['POST'])
def createDoctor(request):
    data = convertBooleans(request.data)
    user = getNewMyUser(request)
    if type(user) is MyUser:
        try:
            new_doctor = Doctor()
            new_doctor.user = user

            for field in data:
                if hasattr(new_doctor, field):
                    setattr(new_doctor, field, data[field])

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
    data = convertBooleans(request.data)
    user = getNewMyUser(request)
    if type(user) is MyUser:
        try:
            new_patient = Patient()
            new_patient.user = user

            for field in data:
                if hasattr(new_patient, field):
                    setattr(new_patient, field, data[field])

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
    data = convertBooleans(request.data)
    patient, user = getNewPatient(request)
    if type(patient) is Patient:
        try:
            new_student = Student()
            new_student.patient = patient

            for field in data:
                if hasattr(new_student, field):
                    setattr(new_student, field, data[field])

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
    data = convertBooleans(request.data)
    patient, user = getNewPatient(request)
    if type(patient) is Patient:
        try:
            new_staff = Staff()
            new_staff.patient = patient

            for field in data:
                if hasattr(new_staff, field):
                    setattr(new_staff, field, data[field])

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
        data = convertBooleans(request.data)
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
        if not symptoms_created:
            appointment.delete()
        
        return response
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

def createSymptoms(data, appointment):
    try:
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

####################### PUT #######################

def checkStatus(status):
    if status < -2 or status > 2:
        return False
    return True

@api_view(['PUT'])  
def updateAppointmentStatus(request):
    try:
        data = convertBooleans(request.data)
        status = int(data['status'])
        if not checkStatus(status):
            return Response({'error': 'status can be -2, -1, 0, 1, 2 only'})
        
        appointment_id = data['appointment_id']
        appointment = Appointment.objects.get(id = appointment_id)
        appointment.status = int(data['status'])
        appointment.save()

        return Response({'message': 'Appointment updated successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})
    
@api_view(['PUT'])  
def updateSymptoms(request):
    try:
        data = convertBooleans(request.data)
        symptoms_id = data['symptoms_id']
        symptoms = Symptoms.objects.get(id = symptoms_id)
        for field in data:
            if hasattr(symptoms, field):
                setattr(symptoms, field, data[field])

        symptoms.save()
        return Response({'message': 'Symptoms updated successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})
    
@api_view(['PUT'])  
def updateTest(request):
    try:
        data = convertBooleans(request.data)
        test_id = data['test_id']
        test = Test.objects.get(id = test_id)
        for field in data:
            if hasattr(test, field):
                setattr(test, field, data[field])

        test.save()
        return Response({'message': 'Test updated successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})
    
@api_view(['PUT'])  
def updateVaccine(request):
    try:
        data = convertBooleans(request.data)
        vaccine_id = data['vaccine_id']
        vaccine = Vaccine.objects.get(id = vaccine_id)
        for field in data:
            if hasattr(vaccine, field):
                setattr(vaccine, field, data[field])

        vaccine.save()
        return Response({'message': 'Vaccine updated successfully.'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})

@api_view(['PUT'])  
def updateMedicalHistory(request):
    try:
        data = convertBooleans(request.data)
        med_id = data['med_hist_id']
        
        if not MedicalHistory.objects.filter(id = med_id).exists:
            return Response({'error': 'Medical history does not exist!!'})

        hist = MedicalHistory.objects.get(id = med_id)
        for field in data:
            if hasattr(hist, field):
                setattr(hist, field, data[field])

        hist.save()
        return Response({'message': 'Medical history updated successfully'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})  

def updateUser(user, data):
    try:
        if not user.patient_or_doc:
            return False, Response({'error': 'Doctor profile is immutable.'})

        for field in data:
                if hasattr(user, field):
                    setattr(user, field, data[field])

        user.save()
        return True, Response({'message': 'User updated successfully'})
    except KeyError as e:
        return False, Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return False, Response({'error': str(e)}) 

def updatePatient(user, patient, data):
    try:
        user_updated, response = updateUser(user, data)
        if not user_updated:
            return response
        
        patient = Patient.objects.get(user=user)
        for field in data:
            if hasattr(patient, field):
                setattr(patient, field, data[field])

        patient.save()
        return True, Response({'message': 'Patient updated successfully'})
    except KeyError as e:
        user.delete()
        return False, Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        user.delete()
        return False, Response({'error': str(e)})

@api_view(['PUT'])
def updateStaff(request):
    try:
        data = convertBooleans(request.data)
        user = MyUser.objects.get(id = data['id'])
        patient = Patient.objects.get(user=user)
        patient_updated ,response = updatePatient(user, patient, data)
        if not patient_updated:
            return response

        staff = Staff.objects.get(patient=patient)
        for field in data:
                if hasattr(staff, field):
                    setattr(staff, field, data[field])

        staff.save()
        return Response({'message': 'Staff updated successfully'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})
    
@api_view(['PUT'])
def updateStudent(request):
    try:
        data = convertBooleans(request.data)
        user = MyUser.objects.get(id = data['id'])
        patient = Patient.objects.get(user=user)
        patient_updated ,response = updatePatient(user, patient, data)
        if not patient_updated:
            return response

        student = Student.objects.get(patient=patient)
        for field in data:
                if hasattr(student, field):
                    setattr(student, field, data[field])

        student.save()
        return Response({'message': 'Student updated successfully'})
    except KeyError as e:
        return Response({'error': f'Missing required field: {str(e)}'})
    except ValidationError as e:
        return Response({'error': str(e)})