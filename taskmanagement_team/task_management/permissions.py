from rest_framework.permissions import BasePermission

class Is_admin(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_admin==True:
            return True
class Not_admin(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_admin==False:
            return True