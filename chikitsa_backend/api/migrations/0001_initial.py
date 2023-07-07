# Generated by Django 4.2.2 on 2023-07-07 07:06

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateTimeField()),
                ('appointment_created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(-1), django.core.validators.MaxValueValidator(2)])),
                ('remarks', models.CharField(default='nil', max_length=200)),
                ('diagnosis_duration_days', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='MedicineMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('count', models.IntegerField(default=0)),
                ('type', models.CharField(max_length=20)),
                ('date_of_mfg', models.DateField()),
                ('date_of_expiry', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=20)),
                ('middle_name', models.CharField(blank=True, max_length=20, null=True)),
                ('last_name', models.CharField(max_length=20)),
                ('mobile_personal', models.CharField(max_length=10, validators=[django.core.validators.MinLengthValidator(10)])),
                ('state', models.CharField(max_length=20)),
                ('district', models.CharField(max_length=30)),
                ('pincode', models.CharField(max_length=6, validators=[django.core.validators.MinLengthValidator(6)])),
                ('address_line', models.CharField(blank=True, max_length=100, null=True)),
                ('patient_or_doc', models.BooleanField(default=True)),
                ('datetime_of_reg', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='TestMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('details', models.CharField(blank=True, default='nil', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VaccineMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('details', models.CharField(blank=True, default='nil', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.myuser')),
                ('degree', models.CharField(max_length=100)),
                ('specialization', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.myuser')),
                ('mobile_emergency', models.CharField(max_length=10, validators=[django.core.validators.MinLengthValidator(10)])),
                ('dob', models.DateField()),
                ('sex', models.CharField(max_length=20)),
                ('blood_group', models.CharField(max_length=20)),
                ('staff_or_student', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('remarks', models.CharField(blank=True, max_length=200, null=True)),
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.appointment')),
                ('test_master', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.testmaster')),
            ],
        ),
        migrations.CreateModel(
            name='Symptoms',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fever', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3)])),
                ('recorded', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(200)])),
                ('continuous_fever', models.BooleanField(default=False)),
                ('intermittent_fever', models.BooleanField(default=False)),
                ('shivering', models.BooleanField(default=False)),
                ('vomiting', models.BooleanField(default=False)),
                ('nausea', models.BooleanField(default=False)),
                ('headache', models.BooleanField(default=False)),
                ('body_pain', models.BooleanField(default=False)),
                ('joint_pain', models.BooleanField(default=False)),
                ('weakness', models.BooleanField(default=False)),
                ('cold', models.BooleanField(default=False)),
                ('runny_nose', models.BooleanField(default=False)),
                ('sneezing', models.BooleanField(default=False)),
                ('throat_pain', models.BooleanField(default=False)),
                ('ear_ache', models.BooleanField(default=False)),
                ('ear_discharge', models.BooleanField(default=False)),
                ('cough', models.BooleanField(default=False)),
                ('dry_cough', models.BooleanField(default=False)),
                ('wet_cough', models.BooleanField(default=False)),
                ('breathlessness', models.BooleanField(default=False)),
                ('appetite', models.BooleanField(default=False)),
                ('abdomen_pain', models.BooleanField(default=False)),
                ('loose_motions', models.BooleanField(default=False)),
                ('urine_color', models.CharField(blank=True, default='nil', max_length=50, null=True)),
                ('other', models.CharField(default='nil', max_length=200)),
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.appointment')),
            ],
        ),
        migrations.CreateModel(
            name='Medicine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('morning', models.BooleanField(default=False)),
                ('noon', models.BooleanField(default=False)),
                ('evening', models.BooleanField(default=False)),
                ('after_food', models.BooleanField(default=False)),
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.appointment')),
                ('medicine_master', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.medicinemaster')),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('patient', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.patient')),
                ('staff_or_relative', models.BooleanField(default=True)),
                ('employee_code', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('patient', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.patient')),
                ('course', models.CharField(max_length=30)),
                ('admission_num', models.CharField(max_length=20)),
                ('hostel_num_and_name', models.CharField(max_length=100)),
                ('room_num', models.CharField(max_length=5)),
                ('father_occupation', models.CharField(max_length=100)),
                ('mother_occupation', models.CharField(max_length=100)),
                ('father_mobile', models.CharField(max_length=100)),
                ('mother_mobile', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Vaccine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('vaccine_master', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.vaccinemaster')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.patient')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hypertension_self', models.BooleanField(default=False)),
                ('hypertension_father', models.BooleanField(default=False)),
                ('hypertension_mother', models.BooleanField(default=False)),
                ('diabetes_self', models.BooleanField(default=False)),
                ('diabetes_father', models.BooleanField(default=False)),
                ('diabetes_mother', models.BooleanField(default=False)),
                ('prev_operation_injury', models.CharField(default='nil', max_length=200)),
                ('chronic_disease', models.CharField(default='nil', max_length=200)),
                ('allergic_medicine', models.CharField(default='nil', max_length=200)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.patient')),
            ],
        ),
        migrations.AddField(
            model_name='appointment',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.doctor'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.patient'),
        ),
    ]
