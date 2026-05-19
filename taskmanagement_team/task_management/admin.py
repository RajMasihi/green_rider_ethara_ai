from django.contrib import admin
from .models import Project_members,Projects,Tasks,User

# Register your models here.
admin.site.register(User)
admin.site.register(Project_members)
admin.site.register(Projects)
admin.site.register(Tasks)