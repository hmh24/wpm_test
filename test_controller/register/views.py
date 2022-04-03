from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import RegisterForm, LoginForm


# Create your views here.

def main(response):
    return render(response, "main.html")


def logout_view(response):
    logout(response)
    return redirect("/")


def login_view(response):
    if response.method == 'POST':
        form = LoginForm(data=response.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None and user.is_active and user.is_authenticated:
                login(response, user)
                return redirect("/type/" + str(user.id))
    else:
        form = LoginForm()
    return render(response, "login_page.html", {"form": form})


def register(response):
    if response.method == "POST":
        form = RegisterForm(response.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password1")
            new_user = authenticate(username=username, password=password)
            if new_user is not None:
                login(response, new_user)
                return redirect("/type/" + str(new_user.id))
                # return redirect(reverse("Type"))
    else:
        form = RegisterForm()
    return render(response, "register.html", {"form": form})
