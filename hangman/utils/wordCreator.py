# This class is responsible for creating a random word for the game from a list of words. 

import random

class WordCreator:

    def __init__(self):
        self.words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "watermelon"]

    @staticmethod
    def get_word(self):
        return random.choice(self.words)
        