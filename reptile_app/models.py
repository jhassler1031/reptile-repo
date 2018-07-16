from django.db import models
from django.contrib.auth.models import AbstractUser

import requests
from django.conf import settings
GOOGLE_API_KEY = settings.GOOGLE_API_KEY

geocode_url = "https://maps.googleapis.com/maps/api/geocode/json"

# def find_latlong(raw_address, city, state, zip_code):
#     temp_address = raw_address.split(" ")
#     temp_address.append(city).append(state).append(zip_code)
#     temp_address = "+".join(temp_address)
#
#     address_url = f"{geocode_url}?address={temp_address}=&key={google_api_key}"
#     resp = requests.get(address_url)
#
#     if resp.status_code in [200, 201]:
#         address_data = resp.json()
#         latlong = address_data["results"][0]["geometry"]["location"]
#         return latlong


# Create your models here.
class User(AbstractUser):
    pass

class Vet(models.Model):
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    created = models.DateTimeField(auto_now_add=True)
    vet_name = models.CharField(max_length=255)
    # Testing creating address
    raw_address = models.CharField(max_length=255)
    raw_address2 = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=5)
    phone = models.CharField(max_length=20, null=True)
    website = models.CharField(max_length=255, null=True)
    emergency_services = models.NullBooleanField()
    boarding_services = models.NullBooleanField()
    notes = models.TextField(null=True)

    ratings = []

    def latlong(self):
        temp_address = self.raw_address.split(" ")
        temp_address.append(self.city).append(self.state).append(self.zip_code)
        temp_address = "+".join(temp_address)

        address_url = f"{geocode_url}?address={temp_address}=&key={google_api_key}"
        resp = requests.get(address_url)

        if resp.status_code in [200, 201]:
            address_data = resp.json()
            latlong = address_data["results"][0]["geometry"]["location"]
            return latlong
        else:
            return "unable to process latlong"
