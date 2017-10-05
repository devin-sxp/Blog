from django.contrib import admin
from beautifulBlog.models import blog,contact,user,blog_tag,blog_comment
from markdownx.admin import MarkdownxModelAdmin
# Register your models here.
admin.site.register(blog,MarkdownxModelAdmin)
admin.site.register(contact)
admin.site.register(user)
admin.site.register(blog_tag)
admin.site.register(blog_comment)

admin.site.site_header = 'blog管理平台'