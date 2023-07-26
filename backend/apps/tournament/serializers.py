from rest_framework import serializers, permissions

from .permissions import IsStaffOrReadOnly, IsAdminOrReadOnly
from . import models


class AddTeamPlayerSerializer(serializers.Serializer):
    permission_classes = [permissions.IsAuthenticated]
    team_id = serializers.IntegerField()
    secret_join_code = serializers.CharField()


class JoinEventSerializer(serializers.Serializer):
    permission_classes = [permissions.IsAuthenticated]
    event_id = serializers.IntegerField()


class StatusSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]

    class Meta:
        model = models.Status
        fields = "__all__"


class RoundsSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]

    class Meta:
        model = models.Round
        fields = "__all__"


class SettingSerializer(serializers.ModelSerializer):
    permission_classes = [IsAdminOrReadOnly]

    class Meta:
        model = models.Setting
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]

    class Meta:
        model = models.Post
        fields = "__all__"


class GameSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]

    class Meta:
        model = models.Game
        fields = "__all__"


class CountrySerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]

    class Meta:
        model = models.Country
        fields = "__all__"


class PlayerSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]
    country_obj = serializers.SerializerMethodField()

    class Meta:
        model = models.Player
        fields = "__all__"

    def get_country_obj(self, obj):
        return CountrySerializer(obj.country).data


class TeamSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]
    country_obj = serializers.SerializerMethodField()
    players_obj = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = models.Team
        fields = "__all__"
        extra_kwargs = {"secret_join_code": {"write_only": True}}

    def get_country_obj(self, obj):
        return CountrySerializer(obj.country).data


class MatchSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]
    team_one_obj = serializers.SerializerMethodField()
    team_two_obj = serializers.SerializerMethodField()

    class Meta:
        model = models.Match
        fields = "__all__"

    def get_team_one_obj(self, obj):
        return TeamSerializer(obj.team_one).data

    def get_team_two_obj(self, obj):
        return TeamSerializer(obj.team_two).data


class EventSerializer(serializers.ModelSerializer):
    game_obj = serializers.SerializerMethodField()
    permission_classes = [IsStaffOrReadOnly]

    class Meta:
        model = models.Event
        fields = "__all__"

    def get_game_obj(self, obj):
        return GameSerializer(obj.game).data


class AnnouncementSerializer(serializers.ModelSerializer):
    permission_classes = [IsStaffOrReadOnly]
    event_obj = serializers.SerializerMethodField()

    class Meta:
        model = models.Announcement
        fields = "__all__"

    def get_event_obj(self, obj):
        return EventSerializer(obj.event).data
