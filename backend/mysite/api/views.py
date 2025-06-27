from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Customer, Item, Purchase, Installment
from .serializers import LoginSerializer, OrderDispatchSerializer, ItemSerializer, CustomerSerializer, PurchaseSerializer, OrderWithCustomerNameSerializer, InstallmentSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from django.db.models import Exists, OuterRef


@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django!"})

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class LoginApi(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user is not None:
                tokens = get_tokens_for_user(user)
                return Response({
                    'message': 'Login successful',
                    'access': tokens['access'],
                    'refresh': tokens['refresh']
                }, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddItem(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            item = serializer.save()
            return Response({
                    'message': 'Item added successfully',
                    'item_id': item.id,
                    'item_name': item.name,
                    'total_quantity': item.quantity,
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditItem(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemSerializer

    def put(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        serializer = self.serializer_class(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Item updated successfully', 'item': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        serializer = self.serializer_class(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Item updated successfully', 'item': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddCustomer(APIView):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            customer = serializer.save()
            return Response({
                'customer_name' : customer.name,
                'phone' : customer.phone,
                'address' : customer.address
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditCustomer(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer

    def put(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = self.serializer_class(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message' : "Customer updated Successfully",
                'customer' : serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = self.serializer_class(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message' : "Customer updated Successfully",
                'customer' : serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class OrderDispatchApi(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderDispatchSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                purchase = serializer.save()
                return Response({
                    'message': 'Order dispatched successfully',
                    'order_id': purchase.id,
                    'customer_name': purchase.customer.name,
                    'total_amount': purchase.total_amount,
                    'is_paid': purchase.is_paid
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    'message': f'Error creating order: {str(e)}'
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomerListApi(ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class ItemListApi(ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

class OrderListApi(ListAPIView):
    queryset = Purchase.objects.all()
    serializer_class = OrderWithCustomerNameSerializer
    # permission_classes = [IsAuthenticated]

class AddInstallmentApi(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InstallmentSerializer

    def post(self, request, purchase_id):
        purchase = get_object_or_404(Purchase, pk=purchase_id)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            amount = serializer.validated_data['amount']
            if amount <= 0 or amount > purchase.remaining_amount:
                return Response({'error': 'Invalid installment amount.'}, status=status.HTTP_400_BAD_REQUEST)
            installment = Installment.objects.create(purchase=purchase, amount=amount)
            purchase.remaining_amount -= amount
            if purchase.remaining_amount <= 0:
                purchase.remaining_amount = 0
                purchase.is_paid = True
            purchase.save()
            return Response({'message': 'Installment added successfully.', 'installment': InstallmentSerializer(installment).data, 'remaining_amount': purchase.remaining_amount, 'is_paid': purchase.is_paid}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
