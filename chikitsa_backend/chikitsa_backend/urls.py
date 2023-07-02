from django.contrib import admin
from django.urls import path, include
import corsheaders

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls'))
]
