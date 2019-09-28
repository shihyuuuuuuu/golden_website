from django.db import models
from django.urls import reverse #Used to generate URLs by reversing the URL patterns

# Create your models here.
class Course(models.Model):
    """Model representing a course"""
    name = models.CharField(max_length=100, help_text='課程名稱')
    teacher = models.CharField(max_length=20, help_text='授課教師')

    SUBJECTS = (
        ('0', '英文部'),
        ('1','數理部'),
        ('2','科技教育中心'),
    )

    department = models.CharField(max_length=1, choices=SUBJECTS, help_text='開班部門')

    WEEK_DAYS = (
        ('6', 'Sunday'),
        ('0', 'Monday'),
        ('1', 'Tuesday'),
        ('2', 'Wednesday'),
        ('3', 'Thursday'),
        ('4', 'Friday'),
        ('5', 'Saturday'),
    )

    day1 = models.CharField(max_length=1, choices=WEEK_DAYS, help_text='星期幾')
    day1_start_time = models.TimeField()
    day1_end_time = models.TimeField()
    
    day2 = models.CharField(max_length=1, choices=WEEK_DAYS, help_text='星期幾', null=True, blank=True)
    day2_start_time = models.TimeField(null=True, blank=True)
    day2_end_time = models.TimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['department']

    def __str__(self):
        """String for representing the Model object."""
        return self.name
