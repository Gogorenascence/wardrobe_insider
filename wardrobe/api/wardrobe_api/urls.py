from django.urls import path
from .views import api_location, api_locations, api_bin, api_bins


urlpatterns = [
    path("locations/", api_locations, name="api_locations"),
    path("locations/<int:id>/", api_location, name="api_location"),
    path("bins/", api_bins, name="api_bins"),
    path("bins/<int:id>/", api_bin, name="api_bin"),
]
