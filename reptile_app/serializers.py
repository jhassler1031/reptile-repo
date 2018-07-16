from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from reptile_app.models import Vet

# Create Serializers Here

# Vet Serializer ===============================================================
class VetSerializer(ModelSerializer):

    class Meta:
        model = Vet
        fields = "__all__"
        read_only_fields = ["author", "created"]
