from django.contrib.auth.models import Group, User
from rest_framework import serializers
import json
from leaderboard.models import *


class StudentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = [
            "rollno",
            "name",
            "math_marks",
            "physics_marks",
            "chemistry_marks",
            "total",
            "percentage",
        ]
