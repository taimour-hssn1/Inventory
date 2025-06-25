from django.urls import path
from .views import * 
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('hello/', hello),
    path('token/', LoginApi.as_view(), name='login'),
    path('order-dispatch/', OrderDispatchApi.as_view(), name='order-dispatch'),
    path('add-item/', AddItem.as_view(), name='add-item'),
    path('edit-item/<int:pk>/', EditItem.as_view(), name='edit-item'),
    path('add-customer/', AddCustomer.as_view(), name='add-customer'),
    path('edit-customer/<int:pk>/', EditCustomer.as_view(), name='edit-customer'),
    path('customers/', CustomerListApi.as_view(), name='customer-list'),
    path('items/', ItemListApi.as_view(), name='item-list'),


]




