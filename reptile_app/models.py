from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
# Basic user model that connects into Djoser
class User(AbstractUser):
    pass

# Creates the Vet class ========================================================
class Vet(models.Model):
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    created = models.DateTimeField(auto_now_add=True)
    vet_name = models.CharField(max_length=255)
    raw_address = models.CharField(max_length=255)
    raw_address2 = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=5)
    phone = models.CharField(max_length=20, null=True)
    website = models.CharField(max_length=255, null=True)
    emergency_services = models.NullBooleanField()
    boarding_services = models.NullBooleanField()
    image = models.FileField(blank=True, null=True, upload_to="media/")
    notes = models.TextField(null=True)

    # Being set by perform_create in VetListCreateAPIView
    lat = models.FloatField(null=True)
    long = models.FloatField(null=True)

    ratings = []

    def __str__(self):
        return self.vet_name

# Create the Store Model for local stores ======================================
class Store(models.Model):
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    created = models.DateTimeField(auto_now_add=True)
    store_name = models.CharField(max_length=255)
    raw_address = models.CharField(max_length=255)
    raw_address2 = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=5)
    phone = models.CharField(max_length=20, null=True)
    website = models.CharField(max_length=255, null=True)
    image = models.FileField(blank=True, null=True, upload_to="media/")
    notes = models.TextField(null=True)

    # Being set by perform_create in StoreListCreateAPIView
    lat = models.FloatField(null=True)
    long = models.FloatField(null=True)

    ratings = []

    def __str__(self):
        return self.store_name

# Create the Illness Model =====================================================
class Illness(models.Model):
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    created = models.DateTimeField(auto_now_add=True)
    illness_name = models.CharField(max_length=255)
    symptoms = models.TextField()
    description = models.TextField()
    # Using a text field as this could affect multiple species
    species_affected = models.TextField()

    def __str__(self):
        return self.illness_name

# Create Message Model =========================================================
# This model is meant to be in place of having people email me directly from the site.
# Instead they post to this table and I can review from the admin page.
class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    contact_name = models.CharField(max_length=50)
    contact_email = models.CharField(max_length=255, null=True)
    contact_phone = models.CharField(max_length=25, null=True)
    message_text = models.TextField()

    def __str__(self):
        return f"Message {self.id} from {self.contact_name}"
    
