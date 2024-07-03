from django.urls import include, path
from rest_framework import routers
from hangman import views

router = routers.DefaultRouter()
router.register(r'hangman', views.HangmanView, 'hangman')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]