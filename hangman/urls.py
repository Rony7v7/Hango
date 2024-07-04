from django.urls import include, path
from rest_framework import routers
from hangman import views

router = routers.DefaultRouter()
router.register(r'hangman', views.HangmanView, 'hangman')

url = 'api/v1/'

urlpatterns = [
    path(url, include(router.urls)),
    path(url +'hello/', views.hello),
    path(url +'new_game/', views.new_game)
]