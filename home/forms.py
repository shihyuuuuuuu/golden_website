from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
import re

class RegisterForm(forms.Form):
    username = forms.CharField(
        required = False,
        widget = forms.TextInput(
            attrs={
                'placeholder': "請輸入使用者名稱 Username",
            }
        )
    )

    password = forms.CharField(
        required = False,
        widget = forms.TextInput(
            attrs={
                'placeholder': "請輸入密碼 Password",
                'type': "password",
            }
        )
    )
    
    password2 = forms.CharField(
        required = False,
        widget = forms.TextInput(
            attrs={
                'placeholder': "請再次輸入密碼 Password again",
                'type': "password",
            }
        )
    )

    def clean_username(self):
        data = self.cleaned_data['username']
        user_exists = User.objects.filter(username=data).exists()
        pattern = re.compile("^[_a-zA-Z0-9]+[_a-zA-Z0-9]*$")
        if user_exists:
            return ['此名稱已經有人使用囉！']
        if len(data) == 0:
            return ['請至少輸入三個字元']
        if not pattern.match(data):
            return ['使用者名稱只能包含英文字母或數字(A-Z, a-z, 0-9)以及下底線(_)']
        if len(data) < 3:
            return ['請至少輸入三個字元']
        if len(data) > 20:
            return ['你的名字太長囉！']
        return data

    def clean_password(self):
        data = self.cleaned_data['password']
        if len(data) < 8:
            return ['Password length is too short.']
        if len(data) > 30:
            return ['Password length is too long.']
        return data

    def clean_password2(self):
        data = self.cleaned_data['password2']
        if len(data) < 8:
            return ['Password2 length is too short.']
        return data