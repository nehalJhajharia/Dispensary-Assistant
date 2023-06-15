from django.db import models
from django.core.validators import MinLengthValidator as minl
from django.core.validators import MinValueValidator as minv, MaxValueValidator as maxv

# Create your models here.

class MyUser(models.Model):
    first_name = models.CharField(max_length=20, null=False)
    middle_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=False)
    mobile_personal = models.CharField(validators=[minl(10)], max_length=10, null=False)
    state = models.CharField(max_length=20, null=False)
    district = models.CharField(max_length=30, null=False)
    pincode = models.CharField(validators=[minl(6)], max_length=6, null=False)
    address_line = models.CharField(max_length=100, null=True, blank=True)
    patient_or_doc = models.BooleanField(default=True)
    datetime_of_reg = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id) + ' : ' + self.first_name + ' ' + self.last_name
        
class Doctor(models.Model):
    user_id = models.OneToOneField(MyUser, primary_key=True, on_delete=models.CASCADE)
    degree = models.CharField(max_length=100, null=False)
    specialization = models.CharField(max_length=100, null=False)
    experience = models.IntegerField(validators=[minv(0), maxv(100)], null=False)

class Patient(models.Model):
    user_id = models.OneToOneField(MyUser, primary_key=True, on_delete=models.CASCADE)
    mobile_emergency = models.CharField(validators=[minl(10),], max_length=10, null=False)
    age = models.IntegerField(validators=[minv(0), maxv(100)], null=False)
    sex = models.CharField(max_length=20, null=False)
    blood_group = models.CharField(max_length=20)
    staff_or_student = models.BooleanField() # True for staff

class Student(models.Model):
    patient_id = models.OneToOneField(Patient, primary_key=True, on_delete=models.CASCADE)
    course = models.CharField(max_length=30, default="nil")
    admission_num = models.CharField(max_length=20, default="nil")
    hostel_num_and_name = models.CharField(max_length=100, default="nil")
    room_num = models.CharField(max_length=5, default="nil")
    father_occupation = models.CharField(max_length=100, default="nil")
    mother_occupation = models.CharField(max_length=100, default="nil")
    father_mobile = models.CharField(max_length=100, default="nil")
    mother_mobile = models.CharField(max_length=100, default="nil")
    
class Staff(models.Model):
    patient = models.OneToOneField(Patient, primary_key=True, on_delete=models.CASCADE)
    staff_or_relative = models.BooleanField(default=True) # True for staff
    employee_code = models.CharField(max_length=20, default="nil")

class MedicalHistory(models.Model):
    patient_id = models.OneToOneField(Patient, primary_key=True, on_delete=models.CASCADE)
    hypertension_self = models.BooleanField(default=False)
    hypertension_father = models.BooleanField(default=False)
    hypertension_mother = models.BooleanField(default=False)
    diabetes_self = models.BooleanField(default=False)
    diabetes_father = models.BooleanField(default=False)
    diabetes_mother = models.BooleanField(default=False)
    prev_operation_injury = models.CharField(max_length=200, default="nil")
    chronic_disease = models.CharField(max_length=200, default="nil")
    allergic_medicine = models.CharField(max_length=200, default="nil")
    
class Vaccine(models.Model):
    patient_id = models.ForeignKey(Patient ,primary_key=False, on_delete=models.CASCADE, to_field='user_id')
    name = models.CharField(max_length=100, null=False)
    date = models.DateField()
    
class Test(models.Model):
    patient_id = models.ForeignKey(Patient ,primary_key=False, on_delete=models.CASCADE, to_field='user_id')
    name = models.CharField(max_length=100, null=False)
    date = models.DateField()
    remarks = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    
class MedicineMaster(models.Model):
    name = models.CharField(max_length=100, null=False)
    count = models.IntegerField(default=0)
    date_of_mfg = models.DateField()
    date_of_expiry = models.DateField()
    
class Medicine(models.Model):
    medicine_id = models.ForeignKey(MedicineMaster, primary_key=False, on_delete=models.CASCADE, to_field='id')
    start_date = models.DateField()
    end_date = models.DateField()
    morning = models.BooleanField(default=False)
    noon = models.BooleanField(default=False)
    evening = models.BooleanField(default=False)
    after_food = models.BooleanField(default=False)

class Treatment(models.Model):
    medicine_one = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_one', null=True, blank=True)
    medicine_two = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_two', null=True, blank=True)
    medicine_three = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_three', null=True, blank=True)
    medicine_four = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_four', null=True, blank=True)
    medicine_five = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_five', null=True, blank=True)
    medicine_six = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_six', null=True, blank=True)
    medicine_seven = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_seven', null=True, blank=True)
    medicine_eight = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_eight', null=True, blank=True)
    medicine_nine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_nine', null=True, blank=True)
    medicine_ten = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='treatment_medicine_ten', null=True, blank=True)


class InvestigationTests(models.Model):
    test_one = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_one')
    test_two = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_two')
    test_three = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_three')
    test_four = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_four')
    test_five = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_five')
    test_six = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_six')
    test_seven = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_seven')
    test_eight = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_eight')
    test_nine = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_nine')
    test_ten = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_ten')
    test_eleven = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_eleven')
    test_twelve = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_twelve')
    test_thirteen = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_thirteen')
    test_fourteen = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_fourteen')
    test_fifteen = models.ForeignKey(Test, on_delete=models.CASCADE, null=True, blank=True, related_name='investigation_test_fifteen')


class Symptoms(models.Model):
    fever = models.IntegerField(default=0, validators=[minv(0), maxv(3)])
    recorded = models.BooleanField(default=False)
    continuous_fever = models.BooleanField(default=False)
    intermittent_fever = models.BooleanField(default=False)
    shivering = models.BooleanField(default=False)
    vomiting = models.BooleanField(default=False)
    nausea = models.BooleanField(default=False)
    headache = models.BooleanField(default=False)
    body_pain = models.BooleanField(default=False)
    joint_pain = models.BooleanField(default=False)
    weakness = models.BooleanField(default=False)
    cold = models.BooleanField(default=False)
    runny_nose = models.BooleanField(default=False)
    sneezing = models.BooleanField(default=False)
    throat_pain = models.BooleanField(default=False)
    ear_ache = models.BooleanField(default=False)
    ear_discharge = models.BooleanField(default=False)
    cough = models.BooleanField(default=False)
    dry_cough = models.BooleanField(default=False)
    wet_cough = models.BooleanField(default=False)
    breathlessness = models.BooleanField(default=False)
    appetite = models.BooleanField(default=False)
    abdomen_pain = models.BooleanField(default=False)
    loose_motions = models.BooleanField(default=False)
    urine_color = models.CharField(max_length=50, null=True, blank=True)
    
class Appointment(models.Model):
    patient = models.OneToOneField(Patient, primary_key=False, on_delete=models.CASCADE)
    doctor = models.OneToOneField(Doctor, primary_key=False, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    appointment_created_at = models.DateTimeField(auto_now_add=True)
    symptoms = models.OneToOneField(Symptoms, primary_key=False, on_delete=models.CASCADE, null=True, blank=True)
    investigation_tests = models.OneToOneField(InvestigationTests, primary_key=False, on_delete=models.CASCADE, null=True, blank=True)
    remarks = models.CharField(max_length=200, default="nil")
    treatment = models.OneToOneField(Treatment, primary_key=False, on_delete=models.CASCADE, null=True, blank=True)
    diagnosis_duration_days = models.IntegerField(default=0)
