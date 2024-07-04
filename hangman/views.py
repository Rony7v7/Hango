from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .serializer import HangmanSerializer
from .models import Hangman
from .utils import wordCreator

class HangmanView(viewsets.ModelViewSet):
    wc = wordCreator.WordCreator()

    serializer_class = HangmanSerializer
    queryset = Hangman.objects.all()

def hello(request):
    return HttpResponse('Hello, World!')

# This method deletes all the games and creates a new one
def new_game(request):
    Hangman.objects.all().delete()
    word = HangmanView.wc.get_word(HangmanView.wc)
    game = Hangman(word=word, attempts=6, guessed_letters='', game_over=False, game_won=False, game_lost=False)
    game.save()
    return JsonResponse({'id' : game.id,'word': game.word})