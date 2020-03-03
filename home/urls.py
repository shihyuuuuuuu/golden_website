from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('registration', views.registration, name='registration'),
    path('login_request', views.login_request, name='login_request'),
    path('logout_request', views.logout_request, name='logout_request'),
    path('aboutus', views.aboutus, name='aboutus'),
    path('myclass', views.myclass, name='myclass'),
    path('bulletin', views.bulletin, name='bulletin'),
    path('pretest', views.pretest, name='pretest'),
    path('discussion', views.discussion, name='discussion'),
    path('score', views.score, name='score'),
]
