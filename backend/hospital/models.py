from django.db import models

# Create your models here.

class Patient(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=20)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    blood_group = models.CharField(max_length=5)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    experience = models.PositiveIntegerField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name    


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField()
    status = models.CharField(max_length=20, default="Scheduled")

    def __str__(self):
        return f"{self.patient.name} - {self.doctor.name}"        


class Prescription(models.Model):
    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="prescriptions"
    )
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="prescriptions"
    )
    medicine = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    instructions = models.TextField()
    prescribed_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.name} - {self.medicine}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="medical_records"
    )
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="medical_records"
    )
    diagnosis = models.CharField(max_length=255)
    symptoms = models.TextField()
    treatment = models.TextField()
    record_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.name} - {self.diagnosis}"


class Billing(models.Model):
    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="billings"
    )
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ("Pending", "Pending"),
            ("Paid", "Paid"),
        ],
        default="Pending"
    )
    billing_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.name} - {self.amount}"                