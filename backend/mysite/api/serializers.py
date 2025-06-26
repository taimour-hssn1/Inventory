from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Item, Customer, Purchase, PurchaseItem
from django.contrib.auth.models import User

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

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

class OrderDispatchSerializer(serializers.Serializer):
    customer_name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=10, required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    items = serializers.ListField(
        child=serializers.DictField(),
        min_length=1
    )

    def validate_items(self, value):
        for item in value:
            if 'item_id' not in item or 'quantity' not in item:
                raise serializers.ValidationError("Each item must have item_id and quantity")
            if item['quantity'] <= 0:
                raise serializers.ValidationError("Quantity must be greater than 0")
        return value

    def create(self, validated_data):
        # Extract customer data
        customer_name = validated_data['customer_name']
        phone = validated_data.get('phone', '')
        address = validated_data.get('address', '')
        
        # Get or create customer
        customer, created = Customer.objects.get_or_create(
            name=customer_name,
            defaults={'phone': phone, 'address': address}
        )
        
        # Create purchase
        items_data = validated_data['items']
        total_amount = 0
        
        # Calculate total amount first
        for item_data in items_data:
            item = Item.objects.get(id=item_data['item_id'])
            quantity = item_data['quantity']
            amount = item.price * quantity
            total_amount += amount
        
        # Create purchase record
        purchase = Purchase.objects.create(
            customer=customer,
            total_amount=total_amount,
            remaining_amount=total_amount,  # Initially remaining equals total
            is_paid=False
        )
        
        # Create purchase items and update inventory
        for item_data in items_data:
            item = Item.objects.get(id=item_data['item_id'])
            quantity = item_data['quantity']
            amount = item.price * quantity
            
            # Create purchase item
            PurchaseItem.objects.create(
                purchase=purchase,
                item=item,
                quantity=quantity,
                amount=amount
            )
            
            # Update inventory (reduce remaining quantity)
            item.quantity -= quantity
            item.save()
        
        return purchase

class OrderWithCustomerNameSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    customer_id = serializers.CharField(source='customer.id', read_only=True)

    items = PurchaseItemSerializer(source='purchaseitem_set', many=True, read_only=True)

    class Meta:
        model = Purchase
        fields = ['id','customer_id',  'customer_name', 'purchase_date', 'total_amount', 'remaining_amount', 'is_paid', 'items']

