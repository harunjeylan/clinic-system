from django.db.models.signals import post_save
from django.contrib.auth.models import User


from django.dispatch import receiver
from main.models import Address, Profile
# ===========================================================================


# ===========================================================================
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

    else:
        try:
            instance.Profile.save()
        except:
            Profile.objects.create(user=instance)


# ===========================================================================
