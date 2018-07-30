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
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

from reptile_app.views import IndexView, VetListCreateAPIView, VetRetrieveUpdateDestroyAPIView, \
                            StoreListCreateAPIView, StoreRetrieveUpdateDestroyAPIView, \
                            IllnessListCreateAPIView, IllnessRetrieveUpdateDestroyAPIView, \
                            MessageListCreateAPIView, MessageRetrieveUpdateDestroyAPIView, \
                            MyVetListAPIView, MyStoreListAPIView, MyIllnessListAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', IndexView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('api-vets/', VetListCreateAPIView.as_view(), name="vet-list"),
    path('api-vets/<int:pk>', VetRetrieveUpdateDestroyAPIView.as_view(), name="vet-detail"),
    path('api-myvets/', MyVetListAPIView.as_view(), name='myvet-list'),
    path('api-stores/', StoreListCreateAPIView.as_view(), name='store-list'),
    path('api-stores/<int:pk>', StoreRetrieveUpdateDestroyAPIView.as_view(), name='store-detail'),
    path('api-mystores/', MyStoreListAPIView.as_view(), name='mystore-list'),
    path('api-illnesses/', IllnessListCreateAPIView.as_view(), name='illness-list'),
    path('api-illnesses/<int:pk>', IllnessRetrieveUpdateDestroyAPIView.as_view(), name='illness-detail'),
    path('api-myillnesses/', MyIllnessListAPIView.as_view(), name='myillness-list'),
    path('messages/', MessageListCreateAPIView.as_view(), name='message-list'),
    path('messages/<int:pk>', MessageRetrieveUpdateDestroyAPIView.as_view(), name='message-detail'),
    # path('invitations/', include('invitations.urls', namespace='invitations')),
    #Following re_path is a catchall allowing page refreshes
    re_path(r'^(?P<path>.*)/$', IndexView.as_view()),
]

# Makes files updated available for display
if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
