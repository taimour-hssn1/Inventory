from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone  
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    quantity_per_container = models.IntegerField()

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=10)
    address = models.TextField()

    def __str__(self):
        return self.name

class Purchase(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(default=timezone.now)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    remaining_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer.name} - {self.purchase_date.strftime('%Y-%m-%d')}"


class PurchaseItem(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.purchase.customer.name} - {self.item.name} - {self.quantity}"
