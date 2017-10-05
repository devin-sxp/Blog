from django.http import JsonResponse,HttpResponse
from django.core import serializers
from django.forms.models import model_to_dict
from django.db.models import Q
from beautifulBlog.models import blog,blog_tag
import json

def get_blogs(request):
    request.encoding = 'utf-8'
    if request.method == 'POST':
        start = int(request.POST['start'])
        end = int(request.POST['end'])
        tag = int(request.POST['tag'])
        search = request.POST['search']
        if search != "":
            blogs = blog.objects.filter(Q(title__contains=search)|Q(description__contains=search)).order_by("-create_time")[start:end]
            blogCount = blog.objects.filter(title=search).count()
        else:
            if tag == 0:
                blogs = blog.objects.all().order_by("-create_time")[start:end]
                blogCount = blog.objects.all().count()
            else:
                blogs = blog.objects.filter(tag = tag).order_by("-create_time")[start:end]
                blogCount = blog.objects.filter(tag = tag).count()
        # use_natural_foreign_keys=True 是否返回外表真实值
        blogs_list = serializers.serialize("json", blogs, use_natural_foreign_keys=True)
        result = {'blogCount':blogCount,'blogs_list':blogs_list}
        # return HttpResponse(json.dumps(blogs_dict),content_type='application/json')
        return JsonResponse(result,safe=False)
    return JsonResponse([],safe=False)

def get_blog_by_id(request):
    request.encoding = 'utf-8'
    if request.method == 'POST':
        blogId = int(request.POST['blogId'])
        try:
            bg = blog.objects.get(id = blogId)
        except Exception as e:
            return JsonResponse([],safe=False)

        bg = serializers.serialize("json", [bg], use_natural_foreign_keys=True)[1:-1]  # serialize不支持转换单个具体实例，放到集合里，然后[1:-1]去掉了前后"[]"

        return JsonResponse(bg,safe=False)

    return JsonResponse([],safe=False)

def get_blog_tags(request):
    request.encoding = 'utf-8'
    if request.method == 'POST':

        blogTags = blog_tag.objects.all()
        blogTagsCount = blog_tag.objects.all().count()

        # use_natural_foreign_keys=True 是否返回外表真实值
        blogTagsList = serializers.serialize("json", blogTags)
        result = {'blogTagsCount': blogTagsCount, 'blogTagsList': blogTagsList}
        return JsonResponse(result, safe=False)
    return JsonResponse([], safe=False)

# def search_blog(request):
#     request.encoding = 'utf-8'
#     if request.method == 'GET':
#         searchCondition = request.GET['input_search']
#         start = request.GET['start']
#         end = request.GET['end']
#         try:
#             blogs = blog.objects.filter(title=searchCondition).order_by("-create_time")[start:end]
#             blogCount = blog.objects.filter(title=searchCondition).count()
#             blogs_list = serializers.serialize("json", blogs, use_natural_foreign_keys=True)
#             result = {'blogCount': blogCount, 'blogs_list': blogs_list}
#             return JsonResponse(result,safe=False)
#         except Exception as e:
#             return JsonResponse([],safe=False)
#
#
#     return JsonResponse([],safe=False)