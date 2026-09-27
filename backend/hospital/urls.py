from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, DoctorViewSet, AppointmentViewSet,PrescriptionViewSet,MedicalRecordViewSet,BillingViewSet

router = DefaultRouter()
router.register('patients', PatientViewSet)
router.register('doctors',DoctorViewSet)
router.register('appointments', AppointmentViewSet)
router.register("prescriptions", PrescriptionViewSet)
router.register("medical-records", MedicalRecordViewSet)
router.register(r"billings", BillingViewSet)


urlpatterns = [
    path('', include(router.urls)),
]