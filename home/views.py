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
    d1, d2 = 0,0;
    for i in range(num_course_day1_today + num_course_day2_today):
        if i < num_course_day1_today:
            today_course[i] = {
                    'name':course_day1_today[d1].name,
                    'start_time':course_day1_today[d1].day1_start_time,
                    'end_time':course_day1_today[d1].day1_end_time,
                    }
            d1 += 1
        else:
            today_course[i] = {
                    'name':course_day2_today[d2].name,
                    'start_time':course_day2_today[d2].day2_start_time,
                    'end_time':course_day2_today[d2].day2_end_time,
                    }
            d2 += 1

    context = {
            'today_course':today_course,
       }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html', context=context)

def bulletin(request):
    return render(request, 'bulletin.html')

def pretest(request):
    return render(request, 'pretest.html')

def dicussion(request):
    return render(request, 'dicussion.html')

def score(request):
    return render(request, 'score.html')