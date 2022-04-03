from rest_framework import viewsets
from register.models import Scores
from .serializers import ScoresSerializer
from rest_framework import permissions


class ScoresViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ScoresSerializer
    # queryset = Scores.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return Scores.objects.filter(user=self.request.user)
