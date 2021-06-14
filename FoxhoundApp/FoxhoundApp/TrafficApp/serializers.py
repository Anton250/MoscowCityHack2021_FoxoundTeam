from rest_framework import serializers

class CategorySerializer(serializers.Serializer):
    category = serializers.ChoiceField(choices=['food', 'bar'])
