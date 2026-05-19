from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from .views import signupview,projectsView,membersView,taskView,customloginView,UserinformationView,AllUsersView,TaskListView,TaskRetrieveUpdateView,ProjectListView
from rest_framework.routers import DefaultRouter
router=DefaultRouter()
router.register(r'projects',projectsView, basename='projects')
router.register(r'members',membersView, basename='members')
router.register(r'tasks',taskView, basename="tasks")

urlpatterns = [
    path('login/',customloginView.as_view()),
    path('refresh/',TokenRefreshView.as_view()),
    path('signup/',signupview.as_view(), name='signup'),
    path('userinfo/',UserinformationView.as_view(), name='userinfo'),
    path('alluserinfo/',AllUsersView.as_view(), name='alluserinfo'),
    path('tasklist/',TaskListView.as_view(),name='tasklist'),
    path('taskretrieveupdate/<int:pk>/',TaskRetrieveUpdateView.as_view(),name='taskretrieveupdate'),
    path('projectlistmember/',ProjectListView.as_view(), name="projectlistmember"),
    # path('taskstatus/',taskStatusUpdateView.as_view(),name='taskstatus'),
    # path('projects/',projectsView.as_view(), name='projects')
    path('',include(router.urls)),

]