from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .serializer import HangmanSerializer
from .models import Hangman
from .utils import wordCreator
from django.views.decorators.csrf import csrf_exempt

class HangmanView(viewsets.ModelViewSet):
    wc = wordCreator.WordCreator()

    serializer_class = HangmanSerializer
    queryset = Hangman.objects.all()

def hello(request):
    return HttpResponse('Hello, World!')

# This method deletes all the games and creates a new one
def new_game(request):
    word = HangmanView.wc.get_word(HangmanView.wc)
    game = Hangman(word=word, attempts=7, guessed_letters='', game_over=False, game_won=False, game_lost=False)
    game.save()
    return JsonResponse({'id' : game.id,'word': game.word})

@csrf_exempt
def guess_letter(request, id, letter):
    game = Hangman.objects.get(id=id)
    if game.game_over:
        return JsonResponse({'message': 'Game is over'})
    if game.game_won:
        return JsonResponse({'message': 'Game is already won'})
    if game.game_lost:
        return JsonResponse({'message': 'Game is already lost'})
    if letter in game.guessed_letters:
        return JsonResponse({'message': 'Letter already guessed'})
    if letter in game.word:
        game.guessed_letters += letter
        if set(game.word) == set(game.guessed_letters):
            game.game_won = True
            game.game_over = True
            game.save()
            return JsonResponse({'message': 'Game won'})
    else:
        game.attempts -= 1
        if game.attempts == 0:
            game.game_lost = True
            game.game_over = True
            game.save()
            return JsonResponse({'message': 'Game lost'})
        if letter not in game.word:
            game.save()
            return JsonResponse({'message': 'Letter not in word'})

    game.save()
    return JsonResponse({'message': 'Letter guessed'})
