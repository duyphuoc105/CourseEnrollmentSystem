from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied

from .models import Enrollment
from .serializers import EnrollmentSerializer


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Enrollment.objects.all()

        # User chỉ xem đăng ký của mình
        if not user.is_staff:
            queryset = queryset.filter(user=user)

        # Admin filter theo trạng thái
        status = self.request.query_params.get("status")
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def perform_create(self, serializer):
        course = serializer.validated_data["course"]

        if Enrollment.objects.filter(
            user=self.request.user,
            course=course
        ).exists():
            raise ValidationError(
                {"detail": "Bạn đã đăng ký khóa học này rồi."}
            )

        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):

        # Chỉ admin được sửa
        if not request.user.is_staff:
            raise PermissionDenied("Chỉ Admin mới được cập nhật.")

        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):

        if not request.user.is_staff:
            raise PermissionDenied("Chỉ Admin mới được cập nhật.")

        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):

        if not request.user.is_staff:
            raise PermissionDenied("Chỉ Admin mới được xóa.")

        return super().destroy(request, *args, **kwargs)