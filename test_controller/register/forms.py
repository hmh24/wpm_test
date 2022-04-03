from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User


class LoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["username"].widget.attrs.update({
            "class": "form-control",
            "id": "user",
            "name": "username",
            "required": ""
        })
        self.fields["password"].widget.attrs.update({
            "class": "form-control",
            "id": "p1",
            "name": "p1",
            "required": ""
        })

    class Meta:
        model = User
        fields = ['username', 'password']


class RegisterForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["username"].widget.attrs.update({
            "class": "form-control",
            "id": "user",
            "name": "username",
            "required": ""
        })
        self.fields["password1"].widget.attrs.update({

            "class": "form-control",
            "id": "p1",
            "name": "p1",
            "required": ""
        })
        self.fields["password2"].widget.attrs.update({
            "class": "form-control",
            "id": "p2",
            "name": "p2",
            "required": ""
        })

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']
