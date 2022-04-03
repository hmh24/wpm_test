from django.urls import path
from .views import index

app_name = "Type"
urlpatterns = [
    path('', index),
    path('<scoresID>/', index),
    path('home/<scoresID>/', index)
]
