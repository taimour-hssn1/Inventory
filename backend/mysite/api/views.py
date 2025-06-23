from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import LoginSerializer
from rest_framework import generics
from django.contrib.auth.models import User

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django!"})


class LoginApi(APIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user is not None:
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
