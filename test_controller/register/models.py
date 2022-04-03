from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.


class Scores(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    all_scores = models.JSONField(default=list)


@receiver(post_save, sender=User)
def update_profile_signal(sender, instance, created, **kwargs):
    if created:
        Scores.objects.create(user=instance)
    instance.scores.save()
