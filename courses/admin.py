from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'title',
        'instructor',
        'price',
        'status',
        'start_date',
        'end_date',
    )

    search_fields = (
        'title',
        'instructor',
    )

    list_filter = (
        'status',
    )