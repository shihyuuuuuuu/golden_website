from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from .models import Course
from .forms import RegisterForm, LoginForm

# Create your views here.
def index(request):
    """View function for home page of site."""
    # Course today
    weekday = datetime.today().weekday()
    num_course_day1_today = Course.objects.filter(day1=weekday).count()
    num_course_day2_today = Course.objects.filter(day2=weekday).count()
    course_day1_today = Course.objects.filter(day1=weekday)
    course_day2_today = Course.objects.filter(day2=weekday)

    today_course = {}
    d1, d2 = 0,0
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
        'register_form': RegisterForm(),
        'login_form': LoginForm(),
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html', context=context)

# A view handling the registration request
def registration(request):
    form = RegisterForm(request.POST)
    response_data = {
        'username_err': '',
    }
    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        password2 = form.cleaned_data['password2']

        # If the type of cleaned_data is list, the input is not valid.
        if type(username) == list:
            response_data['username_err'] = username
        elif type(password) != list and type(password2) != list and password == password2:
            User.objects.create_user(username, '', password)
            
    return JsonResponse(response_data)

# A view handling the login request
def login_request(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse("Login Success!")
        else:
            return HttpResponse("Login Failed.")

# A view handling the login request
def logout_request(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse("You are logged out.") 

def myclass(request):
    context = {'register_form': RegisterForm(), 'login_form': LoginForm()}
    return render(request, 'myclass.html', context=context)

def bulletin(request):
    return render(request, 'bulletin.html')

def pretest(request):
    return render(request, 'pretest.html')

def discussion(request):
    return render(request, 'discussion.html')

def score(request):
    return render(request, 'score.html')