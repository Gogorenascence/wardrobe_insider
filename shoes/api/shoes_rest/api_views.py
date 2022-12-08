from django.http import JsonResponse
from .models import Shoe, BinVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "import_href", "id"]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name", "bin", "id"]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "color", "picture_url", "bin", "id"]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(id=bin_vo_id)
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
            bin_href = f"/api/bins/{bin_vo_id}/"
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "invalid bin id"},
                status=404,
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
        #validation
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
        #validation
        shoe = Shoe.objects.get(id=id)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
