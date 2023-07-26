from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("settings", views.SettingVS)
router.register("announcements", views.AnnouncementVS)
router.register("games", views.GameVS)
router.register("countries", views.CountryVS)
router.register("teams", views.TeamVS)
router.register("matches", views.MatchVS)
router.register("events", views.EventVS)
router.register("posts", views.PostVS)
router.register("statuses", views.StatusVS)
router.register("players", views.PlayerVS)
router.register("rounds", views.RoundVS)


urlpatterns = [
    path("", include(router.urls)),
    path(
        "dashboard/posts/active-posts/",
        views.ActivePostsGLV.as_view(),
        name="active_posts",
    ),
    path(
        "dashboard/teams/add-to-team/",
        views.AddTeamPlayerView.as_view(),
        name="add_team_player",
    ),
    path(
        "dashboard/events/join/",
        views.JointEventView.as_view(),
        name="join_to_event",
    ),
    path(
        "dashboard/events/am-i-part/",
        views.AmIPartOfEventView.as_view(),
        name="am-i-part",
    ),
]
