# Generated by Django 5.0.6 on 2024-07-08 15:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hangman', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hangman',
            name='game_over',
        ),
    ]
