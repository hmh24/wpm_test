from rest_framework import serializers
from register.models import Scores


class ScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scores
        fields = ('id', 'all_scores')
