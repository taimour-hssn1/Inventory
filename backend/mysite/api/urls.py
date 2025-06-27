from django.urls import path
from .views import * 
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('hello/', hello),
    path('token/', LoginApi.as_view(), name='login'),

    path('add-item/', AddItem.as_view(), name='add-item'),
    path('items/', ItemListApi.as_view(), name='item-list'),
    path('edit-item/<int:pk>/', EditItem.as_view(), name='edit-item'),
    path('delete-item/<int:pk>/', DeleteItemApi.as_view(), name='delete-item'),

    path('add-customer/', AddCustomer.as_view(), name='add-customer'),
    path('edit-customer/<int:pk>/', EditCustomer.as_view(), name='edit-customer'),
    path('customers/', CustomerListApi.as_view(), name='customer-list'),
    path('delete-customer/<int:pk>/', DeleteCustomerApi.as_view(), name='delete-customer'),

    path('orders/', OrderListApi.as_view(), name='order-list'),
    path('order-dispatch/', OrderDispatchApi.as_view(), name='order-dispatch'),
    path('edit-order/<int:pk>/', EditOrderApi.as_view(), name='edit-order'),
    path('delete-order/<int:pk>/', DeleteOrderApi.as_view(), name='delete-order'),
    
    path('add-installment/<int:purchase_id>/', AddInstallmentApi.as_view(), name='add-installment'),
]




