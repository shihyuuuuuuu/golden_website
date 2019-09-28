from django.shortcuts import render
from datetime import datetime
from .models import Course

# Create your views here.
def index(request):
    """View function for home page of site."""
    # Course today
    weekday = datetime.today().weekday();
    num_course_day1_today = Course.objects.filter(day1=weekday).count()
    num_course_day2_today = Course.objects.filter(day2=weekday).count()
    course_day1_today = Course.objects.filter(day1=weekday)
    course_day2_today = Course.objects.filter(day2=weekday)

    today_course = {}
    for i in range(num_course_day1_today + num_course_day2_today):
        if i < num_course_day1_today:
            today_course[i] = {
                    'name':course_day1_today[i].name,
                    'start_time':course_day1_today[i].day1_start_time,
                    'end_time':course_day1_today[i].day1_end_time,
                    }
        else:
            today_course[i] = {
                    'name':course_day2_today[i].name,
                    'start_time':course_day2_today[i].day2_start_time,
                    'end_time':course_day2_today[i].day2_end_time,
                    }

    context = {
            'today_course':today_course,
       }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html', context=context)
