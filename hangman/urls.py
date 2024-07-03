from django.urls import path
from rest_framework import routers
from hangman import views

router = routers.DefaultRouter()
router.register(r'hangman', views.Hangman, 'hangman')

urlpatterns = [
    path('api/v1/', views.HangmanView, 'hangman')
]