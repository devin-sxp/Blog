from django.db import models
from markdownx.models import MarkdownxField
from django.utils import timezone

class blog_tag(models.Model):
    id = models.AutoField(primary_key=True)
    tag_name = models.CharField(max_length=50)
    tag_description = models.CharField(max_length=200)
    def __str__(self):
        return self.tag_name

    # 下面为了serializers.serialize获取数据能够获取到外表数据
    # natual_key的序列化
    def natural_key(self):
        return (self.id, self.tag_name, self.tag_description)

    # natual_keys的解序列化
    class Meta:
        unique_together = (( 'id','tag_name', 'tag_description'))

class user(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(u'用户名',max_length=20,default=None)
    user_description = models.TextField(u'描述',default=None)
    user_content = models.TextField(u'内容',default=None)
    user_icon = models.ImageField(u'头像',default="",upload_to='files/userIcon')
    icon1 = models.ImageField(u'图片1', upload_to="files/userImage", default="", blank=True)
    icon2 = models.ImageField(u'图片2', upload_to="files/userImage", default="", blank=True)
    icon3 = models.ImageField(u'图片3', upload_to="files/userImage", default="", blank=True)
    user_create_user = models.IntegerField(default=1)
    user_create_time = models.DateTimeField(max_length=0,default=timezone.now())
    user_status = models.IntegerField(default=1)
    def __str__(self):
        return self.user_name

    def natural_key(self):
        return (self.id,self.user_name)

    class Meta:
        unique_together = (( 'id','user_name'))

class blog(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(u'标题',max_length=300)
    description = models.CharField(u'博客描述',max_length=200,default=None)
    content = MarkdownxField(u'内容')
    icon = models.ImageField(u'图片',upload_to="files/blogImage",default="",blank=True)
    icon1 = models.ImageField(u'图片1',upload_to="files/blogImage",default="",blank=True)
    icon2 = models.ImageField(u'图片2',upload_to="files/blogImage",default="",blank=True)
    icon3 = models.ImageField(u'图片3',upload_to="files/blogImage",default="",blank=True)
    icon4 = models.ImageField(u'图片4',upload_to="files/blogImage",default="",blank=True)
    file = models.FileField(u'视频文件',upload_to="files/blogVideo",default="",blank=True)

    tag = models.ForeignKey(blog_tag)
    user = models.ForeignKey(user,default=None)
    create_user = models.IntegerField(default=1)
    create_time = models.DateTimeField(max_length=0,default=timezone.now())
    status = models.IntegerField(default=1)
    def __str__(self):
        return self.title

class blog_comment(models.Model):
    id = models.AutoField(primary_key=True)
    blog_id = models.IntegerField(default=0)
    full_name = models.CharField(max_length=30)
    email = models.EmailField(blank=True)
    website = models.CharField(max_length=300,blank=True)
    subject = models.CharField(max_length=100)
    message = models.TextField()
    reply_count = models.IntegerField(default=0)
    create_user = models.IntegerField(default=1)
    create_time = models.DateTimeField(max_length=0,default=timezone.now())
    status = models.IntegerField(default=1)
    def __str__(self):
        return self.name

class blog_comment_reply(models.Model):
    id = models.AutoField(primary_key=True)
    comment_id = models.IntegerField(default=0)
    user_name = models.CharField(max_length=30)
    target_user_name = models.CharField(max_length=30)
    message = models.TextField()
    create_user = models.IntegerField(default=1)
    create_time = models.DateTimeField(max_length=0,default=timezone.now())
    status = models.IntegerField(default=1)
    def __str__(self):
        return self.name

class contact(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=200,default=None)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    subject = models.CharField(max_length=300)
    message = models.TextField()
    create_time = models.DateTimeField(max_length=0,default=timezone.now())
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.email

