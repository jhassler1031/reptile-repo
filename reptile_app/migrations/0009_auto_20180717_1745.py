# Generated by Django 2.0.7 on 2018-07-17 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reptile_app', '0008_auto_20180717_1554'),
    ]

    operations = [
        migrations.AddField(
            model_name='vet',
            name='lat',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vet',
            name='long',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]