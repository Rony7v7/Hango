from django.db import models

# Create your models here.
class Hangman(models.Model):
    word = models.CharField(max_length=50) # The word to be guessed
    attempts = models.IntegerField() # Number of attempts left
    guessed_letters = models.CharField(max_length=50) # Letters that have been guessed
    game_over = models.BooleanField() # Whether the game is over
    game_won = models.BooleanField()# Whether the game was won
    game_lost = models.BooleanField() # Whether the game was lost
    def __str__(self):
        return self.word
    