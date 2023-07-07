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
    user = models.OneToOneField(MyUser, primary_key=True, on_delete=models.CASCADE)
    degree = models.CharField(max_length=100, null=False)
    specialization = models.CharField(max_length=100, null=False)

class Patient(models.Model):
    user = models.OneToOneField(MyUser, primary_key=True, on_delete=models.CASCADE)
    mobile_emergency = models.CharField(validators=[minl(10),], max_length=10, null=False)
    dob = models.DateField()
    sex = models.CharField(max_length=20, null=False)
    blood_group = models.CharField(max_length=20)
    staff_or_student = models.BooleanField() # True for staff

class Student(models.Model):
    patient = models.OneToOneField(Patient, primary_key=True, on_delete=models.CASCADE)
    course = models.CharField(max_length=30)
    admission_num = models.CharField(max_length=20)
    hostel_num_and_name = models.CharField(max_length=100)
    room_num = models.CharField(max_length=5)
    father_occupation = models.CharField(max_length=100)
    mother_occupation = models.CharField(max_length=100)
    father_mobile = models.CharField(max_length=100)
    mother_mobile = models.CharField(max_length=100)
    
class Staff(models.Model):
    patient = models.OneToOneField(Patient, primary_key=True, on_delete=models.CASCADE)
    staff_or_relative = models.BooleanField(default=True) # True for staff
    employee_code = models.CharField(max_length=20)

class MedicalHistory(models.Model):
    patient = models.ForeignKey(Patient ,primary_key=False, on_delete=models.CASCADE)
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
    patient = models.ForeignKey(Patient ,primary_key=False, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False)
    date = models.DateField()
    
class MedicineMaster(models.Model):
    name = models.CharField(max_length=100, null=False)
    count = models.IntegerField(default=0)
    type = models.CharField(max_length=20)
    date_of_mfg = models.DateField()
    date_of_expiry = models.DateField()

# status = {
# -1 : rejected
#  0 : not_confirmed
#  1 : confirmed_pending
#  2 : completed
# }
class Appointment(models.Model):
    patient = models.ForeignKey(Patient, primary_key=False, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, primary_key=False, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    appointment_created_at = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(default=0, validators=[minv(-1), maxv(2)])
    remarks = models.CharField(max_length=200, default="nil")
    diagnosis_duration_days = models.IntegerField(default=0)

class Symptoms(models.Model):
    appointment = models.ForeignKey(Appointment, primary_key=False, on_delete=models.CASCADE)
    fever = models.IntegerField(default=0, validators=[minv(0), maxv(3)])
    recorded = models.IntegerField(default=0, validators=[minv(0), maxv(200)])
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
    urine_color = models.CharField(max_length=50, null=True, blank=True, default='nil')
    other = models.CharField(max_length=200, default='nil')

class Test(models.Model):
    appointment = models.ForeignKey(Appointment, primary_key=False, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False)
    date = models.DateField()
    remarks = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

class Medicine(models.Model):
    appointment = models.ForeignKey(Appointment, primary_key=False, on_delete=models.CASCADE)
    medicine = models.ForeignKey(MedicineMaster, primary_key=False, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    morning = models.BooleanField(default=False)
    noon = models.BooleanField(default=False)
    evening = models.BooleanField(default=False)
    after_food = models.BooleanField(default=False)