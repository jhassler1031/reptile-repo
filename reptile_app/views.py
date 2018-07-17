from django.shortcuts import render
from rest_framework import generics
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from reptile_app.models import Vet, Store, Illness, Message
from reptile_app.serializers import VetSerializer, StoreSerializer, IllnessSerializer, \
                                MessageSerializer
from reptile_app.permissions import IsOwnerOrReadOnly

# Create your views here.
class IndexView(TemplateView):
    template_name = "index.html"

# Vet Views ====================================================================
class VetListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = VetSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Vet.objects.all()

        return queryset

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class VetRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vet.objects.all()
    serializer_class = VetSerializer
    permission_classes = [IsOwnerOrReadOnly]

# Store Views ==================================================================
class StoreListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = StoreSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Store.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class StoreRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [IsOwnerOrReadOnly]

# Illness Views ================================================================
class IllnessListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = IllnessSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Illness.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class IllnessRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Illness.objects.all()
    serializer_class = IllnessSerializer
    permission_classes = [IsOwnerOrReadOnly]

# Contact Views ================================================================
# May not actually use this endpoint and only access through admin but add just in case
class MessageListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.all()
        return queryset

class MessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
