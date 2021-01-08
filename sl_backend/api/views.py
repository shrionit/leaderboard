from rest_framework import viewsets, status

from rest_framework.response import Response
from .serializers import *
from leaderboard.models import *


class LeaderBoard(viewsets.ModelViewSet):
    serializer_class = StudentDetailsSerializer
    queryset = StudentDetails.objects.all().order_by("-percentage")
