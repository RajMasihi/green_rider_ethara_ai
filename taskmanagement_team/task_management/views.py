from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SignupSerializer,ProjectSerializer,TaskSerializer,ProjectMembersSerializer,TaskStatusSerializer,CustomLoginSerializer,UserSerializer,UserProjectSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import Is_admin,Not_admin
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Projects,Project_members,User,Tasks
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)

# Create your views here.
class UserinformationView(generics.RetrieveAPIView):
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    def get_object(self):
        return self.request.user
class AllUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated,Is_admin]
    
class customloginView(TokenObtainPairView):
    serializer_class=CustomLoginSerializer

class signupview(APIView):
    def post(self, request):
        serializer=SignupSerializer(data=request.data)
        
        if serializer.is_valid():
            name=serializer.validated_data.get('name')
            serializer.save()
            return Response({
                "message":f"Dear {name} you are now signup successfully"},status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class projectsView(ModelViewSet): 
    serializer_class=ProjectSerializer
    permission_classes=[IsAuthenticated,Is_admin]
    def get_queryset(self):
        qs=Projects.objects.filter(created_by=self.request.user)
      
        return qs
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class membersView(ModelViewSet):
    serializer_class=ProjectMembersSerializer
    permission_classes=[IsAuthenticated,Is_admin]
    def get_queryset(self):
        qs=Project_members.objects.filter(project__created_by=self.request.user)
        project=self.request.query_params.get("project_id")
        if project:
          qs=qs.filter(project=project)
      
        return qs
    
class taskView(ModelViewSet):
    serializer_class=TaskSerializer
    permission_classes=[IsAuthenticated,Is_admin]
    def get_queryset(self):
        qs= Tasks.objects.filter(project_task__created_by=self.request.user)
        project=self.request.query_params.get("project_id")
        if project:
            qs=Tasks.objects.filter(project_task=project)
        
        return qs
# class taskStatusUpdateView(ModelViewSet):
#     qs=Tasks.objects.all()
#     serializer_class=TaskStatusSerializer
#     permission_classes=[IsAuthenticated]
#     def get_queryset(self):
#         return Tasks.objects.filter(assign_to=self.request.user)


class TaskListView(generics.ListAPIView):

    serializer_class = TaskStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Tasks.objects.filter(
            assign_to=self.request.user
        )

class TaskRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = TaskStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Tasks.objects.filter(
            assign_to=self.request.user
        )
class ProjectListView(generics.ListAPIView):
    serializer_class=UserProjectSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return Project_members.objects.filter(user_member=self.request.user)


    


