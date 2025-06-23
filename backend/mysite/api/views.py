from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import LoginSerializer, OrderDispatchSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


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


class OrderDispatchApi(APIView):
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

