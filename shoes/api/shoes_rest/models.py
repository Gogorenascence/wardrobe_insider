from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.closet_name


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200, null=True, blank=True)
    model_name = models.CharField(max_length=200, null=True, blank=True)
    color = models.CharField(max_length=200, null=True, blank=True)
    picture_url = models.URLField(null=True, blank=True)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.model_name

    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"id": self.id})
