# from django.shortcuts import render


from django.http import JsonResponse
from .models import Shoe, BinVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "import_href"]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name", "id"]


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "color", "picture_url", "bin"]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, id=None):
    if request.method == "GET":
        if id is not None:
            shoes = Shoe.objects.filter(bin=id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = f"/api/bins/{id}/"
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
