from django.urls import path
from .views import hello  # Make sure `hello` is defined in views.py

urlpatterns = [
    path('hello/', hello),
]
