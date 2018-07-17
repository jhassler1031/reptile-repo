from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from reptile_app.models import Vet, Store, Illness, Message

# Create Serializers Here

# Vet Serializer ===============================================================
class VetSerializer(ModelSerializer):

    class Meta:
        model = Vet
        fields = "__all__"
        read_only_fields = ["author", "created"]

# Store Serializer =============================================================
class StoreSerializer(ModelSerializer):

    class Meta:
        model = Store
        fields = "__all__"
        read_only_fields = ["author", "created"]

# Illness Serializer ===========================================================
class IllnessSerializer(ModelSerializer):

    class Meta:
        model = Illness
        fields = "__all__"
        read_only_fields = ["author", "created"]

# Contact Serializer ===========================================================
class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ["created"]
