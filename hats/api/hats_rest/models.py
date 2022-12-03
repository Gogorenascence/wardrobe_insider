from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse


class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number= models.PositiveSmallIntegerField()



class Hat(models.Model):
    style = models.CharField(max_length=200,null=True, blank=True)
    fabric = models.CharField(max_length=200,null=True, blank=True)
    color = models.CharField(max_length=200, null=True, blank=True)
    picture_url = models.URLField(null=True, blank=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hat",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_show_location", kwargs=("id": self.id))
    def __str__(self):
        return self.style

    # def get_api_url(self):
    #     return reverse("", kwargs={"pk": self.pk})
