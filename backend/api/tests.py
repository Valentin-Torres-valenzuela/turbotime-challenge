from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Category, Note

class APIViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.category = Category.objects.create(name='Personal', color='#8EB6AD', user=self.user)

    def test_create_note(self):
        url = reverse('note-list')
        data = {'title': 'Test Note', 'content': 'Test Content', 'category': self.category.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)
        self.assertEqual(Note.objects.get().title, 'Test Note')

    def test_get_notes(self):
        Note.objects.create(title='Note 1', content='Content 1', category=self.category, user=self.user)
        url = reverse('note-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_category(self):
        url = reverse('category-list')
        data = {'name': 'Work', 'color': '#FEE29C'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 2)

    def test_filter_notes_by_category(self):
        cat2 = Category.objects.create(name='Work', color='#FEE29C', user=self.user)
        Note.objects.create(title='P Note', content='c', category=self.category, user=self.user)
        Note.objects.create(title='W Note', content='c', category=cat2, user=self.user)
        
        url = reverse('note-list')
        response = self.client.get(url, {'category': self.category.id}, format='json')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'P Note')

    def test_auth_registration(self):
        self.client.force_authenticate(user=None)
        url = reverse('auth_register')
        data = {'username': 'newuser', 'password': 'newpassword', 'email': 'new@test.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_auth_login(self):
        self.client.force_authenticate(user=None)
        url = reverse('token_obtain_pair')
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
