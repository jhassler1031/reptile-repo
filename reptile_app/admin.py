from django.contrib import admin

from reptile_app.models import Vet, Store, Illness, Message

# Register your models here.
admin.site.register(Vet)
admin.site.register(Store)
admin.site.register(Illness)
admin.site.register(Message)
