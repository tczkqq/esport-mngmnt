from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class Setting(models.Model):
    key = models.CharField(max_length=50, unique=True)
    value = models.CharField(max_length=150)

    def __str__(self) -> str:
        return self.key


class Status(models.Model):
    name = models.CharField(max_length=15, unique=True)

    def __str__(self) -> str:
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    description = models.TextField()
    active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title


class Game(models.Model):
    name = models.CharField(max_length=50, unique=True)
    logo = models.ImageField(upload_to=f"games/", blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=70, unique=True)
    image = models.ImageField(upload_to=f"contries/", blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateTimeField(blank=True, null=True)
    cover = models.ImageField(upload_to="events/", null=True, blank=True)
    game = models.ForeignKey(
        Game, on_delete=models.SET_NULL, null=True, related_name="game_obj"
    )
    remote = models.BooleanField(default=False)
    address = models.CharField(max_length=150, null=True, blank=True)
    coordinates = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rules = models.TextField(null=True, blank=True)
    prizes = models.TextField(null=True, blank=True)
    contact = models.TextField(null=True, blank=True)
    max_participants = models.PositiveIntegerField(
        blank=True, null=True, validators=[MinValueValidator(3)]
    )

    def __str__(self) -> str:
        return self.name


class Announcement(models.Model):
    title = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    description = models.TextField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name="event_obj")

    def __str__(self) -> str:
        return self.title


class Round(models.Model):
    name = models.CharField(max_length=30)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name="event_obj")

    def __str__(self) -> str:
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=50)
    logo = models.ImageField(
        upload_to=f"teams/", default="teams/default.png", null=True, blank=True
    )
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    secret_join_code = models.CharField(max_length=120)
    events = models.ManyToManyField(Event, blank=True, related_name="events_obj")

    def __str__(self) -> str:
        return self.name


class Match(models.Model):
    team_one = models.ForeignKey(
        Team, on_delete=models.SET_NULL, null=True, blank=True, related_name="team_one"
    )
    team_two = models.ForeignKey(
        Team, on_delete=models.SET_NULL, null=True, blank=True, related_name="team_two"
    )
    winner = models.ForeignKey(
        Team, on_delete=models.SET_NULL, null=True, blank=True, related_name="winner"
    )
    teamo_one_score = models.PositiveIntegerField(blank=True, null=True)
    team_two_score = models.PositiveIntegerField(blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    date = models.DateTimeField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    status = models.ForeignKey(
        Status, verbose_name="status", on_delete=models.SET_NULL, null=True
    )
    round = models.ForeignKey(Round, on_delete=models.CASCADE, related_name="round_obj")
    best_of = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.date} | {self.team_one.name} vs {self.team_two.name}"


class Player(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="user_obj", blank=True, null=True
    )
    country = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        related_name="country_obj",
        blank=True,
        null=True,
    )
    team = models.ForeignKey(
        Team,
        on_delete=models.SET_NULL,
        related_name="players_obj",
        blank=True,
        null=True,
    )
    nickname = models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.nickname
