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
    # Hangman.objects.all().delete()
    game = Hangman(word=word, attempts=7, guessed_letters='', game_won=False, game_lost=False)
    game.save()
    return JsonResponse({'id' : game.id,'word': game.word, 'attempts': game.attempts, 'guessed_letters': game.guessed_letters})

@csrf_exempt
def guess_letter(request, id, letter): # FIX: words with letters that are the same
    game = Hangman.objects.get(id=id)
    message = 'Is correct'

    if game.game_won == True:
        message = 'Game already won'
    
    if letter in game.guessed_letters:
        message = 'Letter already guessed'

    elif letter in game.word and game.game_lost == False:
        game.guessed_letters += letter
        if set(game.word) == set(game.guessed_letters):
            game.game_won = True
            message = 'Game won'
    else:
        if game.attempts == 0:
            game.game_lost = True
            message = 'Game lost'
        elif letter not in game.word:
            game.attempts -= 1
            message = 'Letter not in word'

    game.save()
    # return game in json format
    return JsonResponse({'id' : game.id,
                        'word': game.word, 
                        'attempts': game.attempts, 
                        'guessed_letters': game.guessed_letters, 
                        'message': message,
                        'game_won': game.game_won})
