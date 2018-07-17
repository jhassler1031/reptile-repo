from django.shortcuts import render
from rest_framework import generics
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from reptile_app.models import Vet, Store, Illness
from reptile_app.serializers import VetSerializer, StoreSerializer, IllnessSerializer
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

class VetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
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

class StoreRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [IsOwnerOrReadOnly]

# Illness Views ================================================================
class IllnessListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = StoreSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Illness.objects.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class IllnessRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Illness.objects.all()
    serializer_class = IllnessSerializer
    permission_classes = [IsOwnerOrReadOnly]
