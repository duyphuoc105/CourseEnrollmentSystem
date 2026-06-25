from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied

from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {
            "request": self.request
        }

    def create(self, request, *args, **kwargs):
        if not request.user.is_staff:
            raise PermissionDenied("Chỉ Admin mới được thêm khóa học.")
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            raise PermissionDenied("Chỉ Admin mới được sửa khóa học.")
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            raise PermissionDenied("Chỉ Admin mới được sửa khóa học.")
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_staff:
            raise PermissionDenied("Chỉ Admin mới được xóa khóa học.")
        return super().destroy(request, *args, **kwargs)