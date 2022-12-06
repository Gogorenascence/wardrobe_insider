from django.urls import path

from .api_views import api_list_shoes, api_show_shoe

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
    path("bins/<int:bin_vo_id>/shoes/", api_list_shoes, name="api_create_shoe"),
    path("shoes/<int:id>/", api_show_shoe, name="api_show_shoe"),
]
