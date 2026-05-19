from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
class User(AbstractUser):
    username=None
    email=models.EmailField(max_length=190,unique=True)
    name=models.CharField(max_length=20)
    is_admin=models.BooleanField(default=False)
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name']

    objects = UserManager()

    def __str__(self):
        return self.email
    


class Projects(models.Model):
    name=models.CharField(max_length=50)
    description=models.TextField()
    created_by=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class Project_members(models.Model):
    project=models.ForeignKey(Projects,on_delete=models.CASCADE)
    user_member=models.ForeignKey(User,on_delete=models.CASCADE)
    join_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('project','user_member')
    
    def __str__(self):
        return self.user_member.name

class Tasks(models.Model):
    task_status = [
      ('TODO', 'To Do'),
     ('IN_PROGRESS', 'In progress'),
     ('DONE', 'Done'),
     ]
    priority_choice=[ ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),]
    
    title=models.CharField(max_length=150)
    description=models.TextField()
    project_task=models.ForeignKey(Projects,on_delete=models.CASCADE)
    assign_to=models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    due_date = models.DateField()
    priority=models.CharField(choices=priority_choice,default='MEDIUM',max_length=10)
    status=models.CharField(choices=task_status,default='TODO', max_length=20)
    completed_at=models.DateTimeField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

