from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from FoxhoundApp.TrafficApp.serializers import CategorySerializer
from FoxhoundApp.TrafficApp.utils import HeatMapDataGetter

class ItemsView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request, format=None):
        data = CategorySerializer(data=request.query_params)
        data.is_valid(raise_exception=True)
        category = data.validated_data['category']
        return Response([])

class HeatMapView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request, format=None):
        data = CategorySerializer(data=request.query_params)
        data.is_valid(raise_exception=True)
        category = data.validated_data['category']
        h = HeatMapDataGetter()
        return Response(h.get_data(category))
