from django.urls import path
from .views import hello, LoginApi, OrderDispatchApi, AddItem, EditItem # Make sure `hello` is defined in views.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('hello/', hello),
    path('token/', LoginApi.as_view(), name='login'),
    path('order-dispatch/', OrderDispatchApi.as_view(), name='order-dispatch'),
    path('add-item/', AddItem.as_view(), name='add-item'),
    path('edit-item/<int:pk>/', EditItem.as_view(), name='edit-item'),
]
