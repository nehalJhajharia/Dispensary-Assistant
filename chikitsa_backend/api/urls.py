from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.getMyUser),
    path('user/medical-history/', views.getMedicalHistory),
    path('user/vaccines/', views.getVaccines),
    path('user/tests/', views.getTests),
    path('all-medicines/', views.getAllMedicines),
]