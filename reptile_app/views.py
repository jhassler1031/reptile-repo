from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from reptile_app.models import Vet
from reptile_app.serializers import VetSerializer
from reptile_app.permissions import IsOwnerOrReadOnly

# Create your views here.

# Vet View =====================================================================
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
