from django.urls import path
from .views import register, main, login_view, logout_view

urlpatterns = [
    path('', main),
    path('register/', register),
    path('login/', login_view),
    path('logout/', logout_view)
]
