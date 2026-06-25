from rest_framework import serializers
from .models import Course
from enrollments.models import Enrollment


class CourseSerializer(serializers.ModelSerializer):

    enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = "__all__"
        read_only_fields = ("created_at",)

    def get_enrolled(self, obj):
        request = self.context.get("request")

        if request is None:
            return False

        if not request.user.is_authenticated:
            return False

        return Enrollment.objects.filter(
            user=request.user,
            course=obj
        ).exists()