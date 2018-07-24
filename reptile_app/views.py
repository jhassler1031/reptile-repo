from django.shortcuts import render
from rest_framework import generics
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
# filters is part of django-filters used for creating search_filters in views
from rest_framework import filters
import requests

from reptile_app.models import Vet, Store, Illness, Message
from reptile_app.serializers import VetSerializer, StoreSerializer, IllnessSerializer, \
                                MessageSerializer
from reptile_app.permissions import IsOwnerOrReadOnly

#Importing Google API key and setting geocode URL variable
from django.conf import settings

geocode_url = "https://maps.googleapis.com/maps/api/geocode/json"

# Functions here ===============================================================

# Funtion to use Geocode API to retrieve lat/long info =========================
def find_latlong(obj):
    # Takes the address items and puts them into a single URL for use with Google Geocodes API
    temp_address = (obj.request.data["raw_address"] + " " + obj.request.data["city"] + " " + obj.request.data["state"] + " " + obj.request.data["zip_code"]).split(" ")
    temp_address = "+".join(temp_address)

    # Using settings.GOOGLE_API_KEY to access the key set in settings.py
    address_url = f"{geocode_url}?address={temp_address}=&key={settings.GOOGLE_API_KEY}"

    # Connect to the Geocodes API and return the portion of the data that gives the Latitude
    # and Longitude of the address.
    resp = requests.get(address_url)
    if resp.status_code in [200, 201]:
        address_data = resp.json()
        return address_data["results"][0]["geometry"]["location"]

# Function to take location search params and return the filtered queryset =====
def location_search(obj, queryset):
    # Query params should come in as ?data="lat","long","radius"
    query = obj.request.query_params.get('data', None)
    if query != None:
        # Split the string of data by the separating commas, then assing to variables
        query = query.split(",")
        search_lat = float(query[0])
        search_long = float(query[1])
        search_radius = float(query[2])

        # Define the high and low end of the search radius by using a simplified version
        # of the Haversine formula.  Removing the math for compensating for the curve of the
        # earth as the search radius will be confined to a relatively small area
        lat_range = (search_lat - (search_radius / 49.0), search_lat + (search_radius / 49.0))
        long_range = (search_long - (search_radius / 69.0), search_long + (search_radius / 69.0))

        # Cannot use <,> etc in the filter, has to be =.  Can use the built in functions
        # of __lte and __gte to find if a value on the model is >=, <=, etc. is = whatever
        # you're comparing it to.
        return queryset.filter(
        lat__gte=lat_range[0], lat__lte=lat_range[1],
        long__gte=long_range[0], long__lte=long_range[1]
        )
    else:
        return queryset


# Create your views here =======================================================

# Basic index view for connecting to index.html
class IndexView(TemplateView):
    template_name = "index.html"

# Vet Views ====================================================================
class VetListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = VetSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = (filters.SearchFilter,)
    # Search query comes from ?search=
    search_fields = ("store_name")

    def get_queryset(self):
        queryset = Vet.objects.all()
        # Run location_search to filter the queryset by the location
        return location_search(self, queryset)

    def perform_create(self, serializer):
        # Call the function to set the lat and long variables of the object
        print("user: ", self.request.user)
        latlong = find_latlong(self)
        serializer.save(author = self.request.user, lat = latlong["lat"], long = latlong["lng"])

class VetRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vet.objects.all()
    serializer_class = VetSerializer
    permission_classes = [IsOwnerOrReadOnly]

# Store Views ==================================================================
class StoreListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = StoreSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = (filters.SearchFilter,)
    search_fields = ("store_name")

    def get_queryset(self):
        queryset = Store.objects.all()
        # Filter the queryset by location params
        return location_search(self, queryset)

    def perform_create(self, serializer):
        # Function to set lat/long variables
        latlong = find_latlong(self)
        serializer.save(author = self.request.user, lat = latlong["lat"], long = latlong["lng"])

class StoreRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [IsOwnerOrReadOnly]

# Illness Views ================================================================
class IllnessListCreateAPIView(generics.ListCreateAPIView):
    queryset = Illness.objects.all()
    serializer_class = IllnessSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = (filters.SearchFilter,)
    search_fields = ("illness_name", "symptoms", "species_affected")

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class IllnessRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Illness.objects.all()
    serializer_class = IllnessSerializer
    permission_classes = [IsOwnerOrReadOnly]

# Contact Views ================================================================
# May not actually use this endpoint and only access through admin but add just in case
class MessageListCreateAPIView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("contact_name", "contact_email", "contact_phone")

class MessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
