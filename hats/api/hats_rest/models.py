from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href=  models.CharField(max_length=200,unique=True)

    def __str__(self):
        return self.closet_name


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
    def __str__(self):
        return self.style

    def get_ap_url(self):
        return reverse ("api_show_hat")
