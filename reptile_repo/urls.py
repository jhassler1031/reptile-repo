"""reptile_repo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from reptile_app.views import IndexView, VetListCreateAPIView, VetRetrieveUpdateDestroyAPIView, \
                            StoreListCreateAPIView, StoreRetrieveUpdateDestroyAPIView, \
                            IllnessListCreateAPIView, IllnessRetrieveUpdateDestroyAPIView, \
                            MessageListCreateAPIView, MessageRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', IndexView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('vets/', VetListCreateAPIView.as_view(), name="vet-list"),
    path('vets/<int:pk>', VetRetrieveUpdateDestroyAPIView.as_view(), name="vet-detail"),
    path('stores/', StoreListCreateAPIView.as_view(), name='store-list'),
    path('stores/<int:pk>', StoreRetrieveUpdateDestroyAPIView.as_view(), name='store-detail'),
    path('illnesses/', IllnessListCreateAPIView.as_view(), name='illness-list'),
    path('illnesses/<int:pk>', IllnessRetrieveUpdateDestroyAPIView.as_view(), name='illness-detail'),
    path('messages/', MessageListCreateAPIView.as_view(), name='message-list'),
    path('messages/<int:pk>', MessageRetrieveUpdateDestroyAPIView.as_view(), name='message-detail'),
]
