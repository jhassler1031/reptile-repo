import json

from django.test import TestCase, RequestFactory, Client
from django.urls import reverse

from rest_framework.test import APIClient
# May not need these
from rest_framework.authtoken.models import Token
# ^^^^^^
from model_mommy import mommy

from reptile_app.models import Vet, Store, Illness, Message, User

# Create your tests here.

class VetViewsetTest(TestCase):
    def setUp(self):
        self.vet = mommy.make(Vet)
        self.user = mommy.make(User)

    def test_vet_list(self):
        # Make sure the rest framework url is configured
        url = reverse('vet-list')
        self.assertEqual(url, '/vets/')

        # Functional test: get list of vets
        c = Client()
        response = c.get(reverse('vet-list'), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_vet_detail(self):
        # Make sure the rest framework url is configured
        url = reverse('vet-detail', kwargs={'pk': self.vet.pk})
        self.assertEqual(url, '/vets/{}'.format(self.vet.pk))

        # Functional test: get detail of vet
        c = Client()
        response = c.get(reverse('vet-detail', kwargs={'pk': self.vet.pk}), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_vet_create(self):
        # Functional test: get detail of vet
        c = APIClient()

        vet_data = {
            'vet_name': 'testing',
            'raw_address': 'testing street',
            'city': 'spartanburg',
            'state': 'sc',
            'zip_code': '29307',
            'emergency_services': True,
            'boarding_services': True,
        }

        # Post request should create record and return status 201
        token = Token.objects.create(user=self.user)
        c.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        response = c.post(reverse('vet-list'), vet_data, format='json')
        self.assertEquals(201, response.status_code)


        # Pull out what data I can use to compare.  Some data will be created and we
        # will not know what it is.
        test_data = {
            'vet_name': response.data['vet_name'],
            'raw_address': response.data['raw_address'],
            'city': response.data['city'],
            'state': response.data['state'],
            'zip_code': response.data['zip_code'],
            'emergency_services': response.data['emergency_services'],
            'boarding_services': response.data['boarding_services']
        }

        # Make sure the vet was created with the values provided
        self.assertEquals(test_data, vet_data)

# Store model testing ==========================================================
class StoreViewsetTest(TestCase):
    def setUp(self):
        self.store = mommy.make(Store)
        self.user = mommy.make(User)

    def test_store_list(self):
        # Make sure the rest framework url is configured
        url = reverse('store-list')
        self.assertEqual(url, '/stores/')

        # Functional test: get list of stores
        c = Client()
        response = c.get(reverse('store-list'), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_store_detail(self):
        # Make sure the rest framework url is configured
        url = reverse('store-detail', kwargs={'pk': self.store.pk})
        self.assertEqual(url, '/stores/{}'.format(self.store.pk))

        # Functional test: get detail of stores
        c = Client()
        response = c.get(reverse('store-detail', kwargs={'pk': self.store.pk}), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_store_create(self):
        # Functional test: get detail of store
        c = APIClient()

        store_data = {
            'store_name': 'testing',
            'raw_address': 'testing street',
            'city': 'spartanburg',
            'state': 'sc',
            'zip_code': '29307',
            'notes': "test notes"
        }

        # Post request should create record and return status 201
        token = Token.objects.create(user=self.user)
        c.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        response = c.post(reverse('store-list'), store_data, format='json')
        self.assertEquals(201, response.status_code)


        # Pull out what data I can use to compare.  Some data will be created and we
        # will not know what it is.
        test_data = {
            'store_name': response.data['store_name'],
            'raw_address': response.data['raw_address'],
            'city': response.data['city'],
            'state': response.data['state'],
            'zip_code': response.data['zip_code'],
            'notes': response.data['notes'],
        }

        # Make sure the store was created with the values provided
        self.assertEquals(test_data, store_data)

# Illness model testing ========================================================
class IllnessViewsetTest(TestCase):
    def setUp(self):
        self.illness = mommy.make(Illness)
        self.user = mommy.make(User)

    def test_illness_list(self):
        # Make sure the rest framework url is configured
        url = reverse('illness-list')
        self.assertEqual(url, '/illnesses/')

        # Functional test: get list of illnesses
        c = Client()
        response = c.get(reverse('illness-list'), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_illness_detail(self):
        # Make sure the rest framework url is configured
        url = reverse('illness-detail', kwargs={'pk': self.illness.pk})
        self.assertEqual(url, '/illnesses/{}'.format(self.illness.pk))

        # Functional test: get detail of illnesses
        c = Client()
        response = c.get(reverse('illness-detail', kwargs={'pk': self.illness.pk}), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_illness_create(self):
        # Functional test: get detail of illness
        c = APIClient()

        illness_data = {
            'illness_name': 'testing',
            'symptoms': 'testing symptoms',
            'description': 'testing',
            'species_affected': 'bearded dragons',
        }

        # Post request should create record and return status 201
        token = Token.objects.create(user=self.user)
        c.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        response = c.post(reverse('illness-list'), illness_data, format='json')
        self.assertEquals(201, response.status_code)


        # Pull out what data I can use to compare.  Some data will be created and we
        # will not know what it is.
        test_data = {
            'illness_name': response.data['illness_name'],
            'symptoms': response.data['symptoms'],
            'description': response.data['description'],
            'species_affected': response.data['species_affected'],
        }

        # Make sure the illness was created with the values provided
        self.assertEquals(test_data, illness_data)

# Message Model Testing ========================================================
class MessageViewsetTest(TestCase):
    def setUp(self):
        self.message = mommy.make(Message)

    def test_message_list(self):
        # Make sure the rest framework url is configured
        url = reverse('message-list')
        self.assertEqual(url, '/messages/')

        # Functional test: get list of messages
        c = Client()
        response = c.get(reverse('message-list'), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_message_detail(self):
        # Make sure the rest framework url is configured
        url = reverse('message-detail', kwargs={'pk': self.message.pk})
        self.assertEqual(url, '/messages/{}'.format(self.message.pk))

        # Functional test: get detail of message
        c = Client()
        response = c.get(reverse('message-detail', kwargs={'pk': self.message.pk}), content_type='application/json')
        self.assertEquals(200, response.status_code)

    def test_message_create(self):
        # Functional test: get detail of illness
        c = APIClient()

        message_data = {
            'contact_name': 'testing',
            'contact_email': 'testing symptoms',
            'contact_phone': 'testing',
            'message_text': 'test text',
        }

        # Post request should create record and return status 201
        response = c.post(reverse('message-list'), message_data, format='json')
        self.assertEquals(201, response.status_code)


        # Pull out what data I can use to compare.  Some data will be created and we
        # will not know what it is.
        test_data = {
            'contact_name': response.data['contact_name'],
            'contact_email': response.data['contact_email'],
            'contact_phone': response.data['contact_phone'],
            'message_text': response.data['message_text'],
        }

        # Make sure the message was created with the values provided
        self.assertEquals(test_data, message_data)
