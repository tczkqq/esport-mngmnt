from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from apps.tournament.serializers import PlayerSerializer
from apps.tournament.models import Player


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    user_obj = PlayerSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_superuser",
            "user_obj",
        )
        extra_kwargs = {
            "first_name": {"allow_null": True},
            "last_name": {"allow_null": True},
            "email": {"required": True},
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )

        user.set_password(validated_data["password"])
        user.save()
        Player.objects.create(user=user, nickname=validated_data["username"])

        return user
