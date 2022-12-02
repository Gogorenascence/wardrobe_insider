# from django.shortcuts import render


from django.http import JsonResponse
from .models import Shoe, BinVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "bin_size"]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name"]


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "color", "picture_url", "bin"]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        shoes = Shoe.objects.filter(bin=bin_vo_id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = f"/api/bin/{bin_vo_id}/"
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_shoe(request, id):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=id)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        Shoe.objects.filter(id=id).update(**content)

        shoe = Shoe.objects.get(id=id)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
