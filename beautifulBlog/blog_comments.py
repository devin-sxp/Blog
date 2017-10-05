from django.http import JsonResponse,HttpResponse,HttpResponseRedirect
from django.core import serializers
from django.shortcuts import render
from django.forms.models import model_to_dict
from beautifulBlog.models import blog_comment
import json
from django.utils import timezone


def get_comment_by_blog_id(request):
    request.encoding = 'utf-8'
    if request.method == 'POST':
        blogId = int(request.POST['blogId'])
        start = int(request.POST['start'])
        end = int(request.POST['end'])
        try:
            comments = blog_comment.objects.filter(blog_id = blogId).order_by("-create_time")[start:end]
            count = blog_comment.objects.filter(blog_id=blogId).count()
        except Exception as e:
            return JsonResponse([],safe=False)

        comments = serializers.serialize("json", comments)
        result = {'count': count, 'comments': comments}
        return JsonResponse(result,safe=False)

    return JsonResponse([],safe=False)

def save_comment(request):
    request.encoding = 'utf-8'
    request.session['url'] = request.META.get('HTTP_REFERER', '/') # 获取来源url，放入session
    if request.method == 'POST':
        blogId = request.POST['blog_id']
        fullName = request.POST['full_name']
        email = request.POST['email']
        subject = request.POST['subject']
        website = request.POST['website']
        message = request.POST['message']
        try:
            comment = blog_comment(blog_id=blogId,full_name=fullName,email=email,subject=subject,website=website,message=message,create_time= timezone.now())
            comment.save()
        except Exception as e:
            return JsonResponse(['false'],safe=False)
        return HttpResponseRedirect(request.session['url'])

