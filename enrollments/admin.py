from django.contrib import admin
from .models import Enrollment


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'user',
        'course',
        'status',
        'enroll_date',
    )

    list_filter = (
        'status',
    )

    search_fields = (
        'user__username',
        'course__title',
    )