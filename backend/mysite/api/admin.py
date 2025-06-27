from django.contrib import admin
from .models import Customer, Item, Purchase, PurchaseItem, Installment
# Register your models here.


admin.site.register(Customer)
admin.site.register(Item)
admin.site.register(Purchase)
admin.site.register(PurchaseItem)
admin.site.register(Installment)