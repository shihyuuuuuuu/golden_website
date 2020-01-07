from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('registration', views.registration, name='registration'),
    path('login', views.login, name='login'),
    path('bulletin', views.bulletin, name='bulletin'),
    path('pretest', views.pretest, name='pretest'),
    path('dicussion', views.dicussion, name='dicussion'),
    path('score', views.score, name='score'),
]
