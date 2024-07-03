from rest_framework import serializers

from hangman.models import Hangman

class HangmanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hangman
        fields = '__all__'