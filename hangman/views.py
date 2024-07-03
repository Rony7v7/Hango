from rest_framework import viewsets
from .serializer import HangmanSerializer
from .models import Hangman

class HangmanView(viewsets.ModelViewSet):
    serializer_class = HangmanSerializer
    queryset = Hangman.objects.all()
