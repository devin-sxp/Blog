"""Blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from Blog import settings
from django.conf.urls.static import static
from django.contrib import admin
from beautifulBlog import views,blogs,blog_comments,contacts,user
from markdownx import urls as markdownx

urlpatterns = [
    url(r'^markdownx/', include('markdownx.urls')),
    url(r'^$', views.index, name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^index.html$',views.index, name='index'),
    url(r'^single.html$',views.single, name='single'),
    url(r'^contact.html$', views.contact, name='contact'),
    url(r'^about.html$', views.about, name='about'),

    url(r'^get_blogs$', blogs.get_blogs),
    url(r'^get_blog_tags$',blogs.get_blog_tags),
    # url(r'^search_blog$', blogs.search_blog),
    url(r'^get_blog_by_id$', blogs.get_blog_by_id),
    url(r'^get_comment_by_blog_id$', blog_comments.get_comment_by_blog_id),
    url(r'^save_comment$', blog_comments.save_comment),

    url(r'^save_contact$', contacts.save_contact),

    url(r'^get_user_by_id$', user.get_user_by_id),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
