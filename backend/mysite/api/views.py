from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django!"})
