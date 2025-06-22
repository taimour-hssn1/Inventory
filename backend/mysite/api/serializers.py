from rest_framework import serializers
from .models import Item, Customer, Purchase, PurchaseItem

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class PurchaseItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)  
    item_id = serializers.PrimaryKeyRelatedField(
        queryset=Item.objects.all(), source='item', write_only=True
    )

    class Meta:
        model = PurchaseItem
        fields = ['id', 'item', 'item_id', 'quantity', 'amount']

class PurchaseSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(), source='customer', write_only=True
    )
    items = PurchaseItemSerializer(source='purchaseitem_set', many=True, read_only=True)

    class Meta:
        model = Purchase
        fields = ['id', 'customer', 'customer_id', 'purchase_date', 'total_amount', 'remaining_amount', 'is_paid', 'items']
