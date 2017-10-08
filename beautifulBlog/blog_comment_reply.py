from django.http import JsonResponse,HttpResponse,HttpResponseRedirect
from django.core import serializers
from django.shortcuts import render
from django.forms.models import model_to_dict
from beautifulBlog.models import blog_comment_reply,blog_comment
import json
from django.utils import timezone

def save_reply(request):
    request.encoding = 'utf-8'
    if request.method == 'POST':
        comment_id = request.POST['comment_id']
        user_name = request.POST['user_name']
        target_user_name = request.POST['target_user_name']
        message = request.POST['message']
        try:
            comment = blog_comment.objects.get(id=comment_id)
            comment.reply_count = comment.reply_count + 1
            reply = blog_comment_reply(comment_id=comment_id,user_name=user_name,target_user_name=target_user_name,message=message,create_time= timezone.now())
            comment.save()
            reply.save()
        except Exception as e:
            return JsonResponse(['false'],safe=False)
        return JsonResponse(['true'],safe=False)

def get_replys(request):
    request.encoding = 'utf-8'
    if request.method == 'POST':
        comment_id = request.POST['comment_id']
        replys = blog_comment_reply.objects.filter(comment_id=comment_id).order_by("-create_time")
        replys = serializers.serialize("json", replys)
        result = {'replys':replys}
        # return HttpResponse(json.dumps(blogs_dict),content_type='application/json')
        return JsonResponse(result,safe=False)
    return JsonResponse([],safe=False)