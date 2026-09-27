from rest_framework import serializers
from .models import Patient,Doctor,Appointment,Prescription, MedicalRecord, Billing


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = "__all__"        

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"     


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = "__all__"      



class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = "__all__"



class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = "__all__"
