from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.Team)
admin.site.register(models.Country)
admin.site.register(models.Game)
admin.site.register(models.Announcement)
admin.site.register(models.Match)
admin.site.register(models.Event)
admin.site.register(models.Post)
admin.site.register(models.Player)
admin.site.register(models.Status)
admin.site.register(models.Setting)
admin.site.register(models.Round)
