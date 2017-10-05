from django.http import JsonResponse,HttpResponseRedirect
from beautifulBlog.models import contact
from django.utils import timezone


def save_contact(request):
    request.encoding = 'utf-8'
    request.session['url'] = request.META.get('HTTP_REFERER', '/') # 获取来源url，放入session
    if request.method == 'POST':
        fullName = request.POST['full_name']
        email = request.POST['email']
        subject = request.POST['subject']
        website = request.POST['website']
        message = request.POST['message']
        try:
            ct = contact(full_name=fullName,email=email,subject=subject,website=website,message=message,create_time= timezone.now())
            ct.save()
        except Exception as e:
            return JsonResponse(['false'],safe=False)
        return HttpResponseRedirect(request.session['url'])

