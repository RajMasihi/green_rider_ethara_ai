from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User,Project_members,Projects,Tasks
from datetime import date,datetime
class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model=User
      fields=['id','name','email']
      read_only_fields=['name','email']

class CustomLoginSerializer(TokenObtainPairSerializer):
   
   def validate(self, attrs):
       data=super().validate(attrs)
       data["name"]=self.user.name
       data["is_admin"]=False
       
       if self.user.is_admin:
          data["is_admin"]=True
       print(data)
       return data

class SignupSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True, min_length=6)

    class Meta:
      model=User
      fields=['name','email','is_admin','password']

    def create(self,validate_data):
       user=User.objects.create_user(
          name=validate_data['name'],
          email=validate_data['email'],
          is_admin=validate_data['is_admin'],
          password=validate_data['password']

       )  
       return user
    
class ProjectSerializer(serializers.ModelSerializer):
   class Meta:
      model=Projects
      fields='__all__'
      read_only_fields = ['created_by']

   def validate(self,data):
      request = self.context.get('request')
      user = request.user
      name=data.get('name')
      print(user.id)
      print(user)
   
      if Projects.objects.filter(created_by=user.id,name=name).exists():
          raise serializers.ValidationError({"name_error":f"{name}- project is already created! Please create another project"})
      return data

class ProjectMembersSerializer(serializers.ModelSerializer):
   member_details=UserSerializer(source="user_member", read_only=True)
   project_name = serializers.CharField(source="project.name", read_only=True)
   class Meta:
      model=Project_members
      fields='__all__'
      
   def validate(self, data):
      project=data.get('project')
      request=self.context.get('request')
      user=request.user
      if project.created_by!=user:
          raise serializers.ValidationError("in this project you have not permissions to add members")
      return data
   
class TaskSerializer(serializers.ModelSerializer):
   member_assignt_details=UserSerializer(source="assign_to", read_only=True)
   project_name = serializers.CharField(source="project_task", read_only=True)
   def validate(self,data):
      request = self.context.get('request')

      user = request.user

      

      assignto = data.get(
        'assign_to',
        self.instance.assign_to if self.instance else None
    )

      project_task = data.get(
        'project_task',
        self.instance.project_task if self.instance else None
    )

      due_date = data.get(
        'due_date',
        self.instance.due_date if self.instance else None
    )

      title = data.get(
        'title',
        self.instance.title if self.instance else None
    )

       
      if project_task.created_by != user:

         raise serializers.ValidationError(
                "you are not project owner"
            )

       
      if due_date < date.today():

         raise serializers.ValidationError(
                "due date can not be in past"
            )

      
      if assignto:

           
         if not Project_members.objects.filter(
                project=project_task.id,
                user_member=assignto.id
            ).exists():

               raise serializers.ValidationError(
                    f'{assignto} is not member of this project'
                )

            
         if Tasks.objects.filter(
                title=title,
                assign_to=assignto.id,
                project_task=project_task.id
            ).exists() and not self.instance:

            raise serializers.ValidationError(
                    'this task already exists'
                )
      
      return data
        
   class Meta:
      model=Tasks
      fields='__all__'
      read_only_fields=['status']

class UserProjectSerializer(serializers.ModelSerializer):
   project_name=serializers.CharField(source="project.name", read_only=True)
   project_description=serializers.CharField(source="project.description", read_only=True)
   class Meta:
      model=Project_members
      fields='__all__'

class TaskStatusSerializer(serializers.ModelSerializer):
   project_name = serializers.CharField(source="project_task", read_only=True)
   class Meta:
      model=Tasks
      fields='__all__'
      read_only_fields=['title','description','project_task','assign_to','due_date','priority','created_at']

   # def validate_status(self,value):
   #    request = self.context.get('request')
   #    user = request.user
     

   #    if value not in [2,3]:
   #       raise serializers.ValidationError("You are not selecting valid status")
   #    if value==1:
   #       raise serializers.ValidationError("This status has already done")
   #    if value==3 and Tasks.objects.filter(id=self.instance.id,status=1):
   #       raise serializers.ValidationError("you can not change status directly to done before you are not come at In progress status")
   #    return value
   

   def update(self, instance, validated_data):
      status = validated_data.get('status', instance.status)

      request = self.context.get('request')
      user = request.user
     

      if status not in ['IN_PROGRESS','DONE']:
         raise serializers.ValidationError("You are not selecting valid status")
      if status=='TODO':
         raise serializers.ValidationError("This status has already done")
      if status=="DONE" and Tasks.objects.filter(id=instance.id,status="TODO"):
         raise serializers.ValidationError("you can not change status directly to done before you are not come at In progress status")


      if status == 3 and instance.status != 3:
        instance.completed_at = datetime.now()  

      instance.status = status
      instance.save()

      return instance
         
