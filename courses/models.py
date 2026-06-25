from django.db import models


class Course(models.Model):

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()

    instructor = models.CharField(max_length=100)

    duration = models.PositiveIntegerField(
        help_text="Duration (hours)"
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    start_date = models.DateField()

    end_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title