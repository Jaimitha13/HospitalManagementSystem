from rest_framework import viewsets

from .models import Patient, Doctor, Appointment,Prescription,MedicalRecord,Billing
from .serializers import PatientSerializer, DoctorSerializer, AppointmentSerializer,PrescriptionSerializer, MedicalRecordSerializer,BillingSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer    


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer    


class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all().order_by("-id")
    serializer_class = PrescriptionSerializer


class MedicalRecordViewSet(viewsets.ModelViewSet):
    queryset = MedicalRecord.objects.all().order_by("-id")
    serializer_class = MedicalRecordSerializer    



class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all().order_by("-id")
    serializer_class = BillingSerializer    