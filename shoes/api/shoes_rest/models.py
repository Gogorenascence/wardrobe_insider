from django.db import models

# Create your models here.
# from django.urls import reverse
# from django.core.exceptions import ObjectDoesNotExist


class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200, null=True, blank=True)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200, null=True, blank=True)
    picture_url = models.CharField(max_length=200, null=True, blank=True)

    Bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    # def get_api_url(self):
    #         return reverse("api_show_location", kwargs={"id": self.id})

    def __str__(self):
        return self.name

    # def create_badge():
    #     try:
    #         self.badge
    #     except ObjectDoesNotExist:
