from rest_framework import serializers
from .models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    course_title = serializers.CharField(
        source="course.title",
        read_only=True
    )

    instructor = serializers.CharField(
        source="course.instructor",
        read_only=True
    )

    course_price = serializers.DecimalField(
        source="course.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Enrollment
        fields = (
            "id",
            "user",
            "username",
            "course",
            "course_title",
            "course_price",
            "instructor",
            "status",
            "enroll_date",
        )

        read_only_fields = (
    "user",
    "username",
    "enroll_date",
    "course_title",
    "course_price",
    "instructor",
)