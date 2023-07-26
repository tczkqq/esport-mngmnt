from rest_framework import viewsets, generics, views, permissions
from rest_framework.response import Response

from .permissions import IsAdminOrReadOnly, IsStaffOrReadOnly
from . import models
from . import serializers


class AddTeamPlayerView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.AddTeamPlayerSerializer

    def post(self, request):
        player = models.Player.objects.get(user=request.user.id)
        if player.team != None:
            return Response({"error": "User already has a team."}, 400)
        data_serialized = serializers.AddTeamPlayerSerializer(data=request.data)
        if not data_serialized.is_valid():
            return Response({"error": "Wrong request structure."}, 400)
        try:
            team = models.Team.objects.get(
                id=data_serialized.data["team_id"],
                secret_join_code=data_serialized.data["secret_join_code"],
            )
        except models.Team.DoesNotExist:
            return Response(
                {"error": "Team does not exist or secret code is incorrect."}, 400
            )

        player.team = team
        player.save()
        return Response(serializers.PlayerSerializer(player).data)


class JointEventView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.JoinEventSerializer

    def post(self, request):
        player = models.Player.objects.get(user=request.user.id)
        if player.team == None:
            return Response({"error": "User has no team."}, 400)

        data_serialized = serializers.JoinEventSerializer(data=request.data)
        if not data_serialized.is_valid():
            return Response({"error": "Wrong request structure."}, 400)
        team = models.Team.objects.get(id=player.team.id)
        team.events.add(data_serialized.data["event_id"])
        team.save()
        return Response({"msg": "Joined event"})


class AmIPartOfEventView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.JoinEventSerializer

    def post(self, request):
        player = models.Player.objects.get(user=request.user.id)
        if player.team == None:
            return Response({"error": "User has no team."}, 400)

        data_serialized = serializers.JoinEventSerializer(data=request.data)
        if not data_serialized.is_valid():
            return Response({"error": "Wrong request structure."}, 400)

        team = models.Team.objects.get(id=player.team.id)
        try:
            team.events.get(id=data_serialized.data["event_id"])
        except models.Event.DoesNotExist:
            return Response(False, 200)

        return Response(True, 200)


class ActivePostsGLV(generics.ListAPIView):
    queryset = models.Post.objects.filter(active=True).order_by("-date")
    serializer_class = serializers.PostSerializer
    filterset_fields = ["id"]


class SettingVS(viewsets.ModelViewSet):
    queryset = models.Setting.objects.all()
    serializer_class = serializers.SettingSerializer
    permission_classes = [IsAdminOrReadOnly]


class PlayerVS(viewsets.ModelViewSet):
    queryset = models.Player.objects.all()
    serializer_class = serializers.PlayerSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ["id"]


class StatusVS(viewsets.ModelViewSet):
    queryset = models.Status.objects.all()
    serializer_class = serializers.StatusSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id"]


class AnnouncementVS(viewsets.ModelViewSet):
    queryset = models.Announcement.objects.all()
    serializer_class = serializers.AnnouncementSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id"]


class PostVS(viewsets.ModelViewSet):
    queryset = models.Post.objects.all().order_by("-date")
    serializer_class = serializers.PostSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id"]


class GameVS(viewsets.ModelViewSet):
    queryset = models.Game.objects.all()
    serializer_class = serializers.GameSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id"]


class CountryVS(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id"]


class TeamVS(viewsets.ModelViewSet):
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id", "events"]


class MatchVS(viewsets.ModelViewSet):
    queryset = models.Match.objects.all()
    serializer_class = serializers.MatchSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id", "status"]


class RoundVS(viewsets.ModelViewSet):
    queryset = models.Round.objects.all()
    serializer_class = serializers.RoundsSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id", "event"]


class EventVS(viewsets.ModelViewSet):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer
    permission_classes = [IsStaffOrReadOnly]
    filterset_fields = ["id"]
