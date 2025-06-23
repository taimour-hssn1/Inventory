from django.urls import path
from .views import hello, LoginApi # Make sure `hello` is defined in views.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('hello/', hello),
    path('token/', LoginApi.as_view(), name='token_obtain_pair'),
    path('token/refresh/', LoginApi.as_view(), name='token_refresh'),
]
