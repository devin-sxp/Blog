from django.http import JsonResponse,HttpResponseRedirect
from beautifulBlog.models import user
from django.core import serializers


def get_user_by_id(request):
    request.encoding = 'utf-8'
    if request.method == 'POST':
        id = int(request.POST['id'])
        try:
            person = user.objects.get(id=id)
        except Exception as e:
            return JsonResponse([],safe=False)

        person = serializers.serialize("json", [person])[1:-1]  # serialize不支持转换单个具体实例，放到集合里，然后[1:-1]去掉了前后"[]"

        return JsonResponse(person,safe=False)

    return JsonResponse([],safe=False)
