# Generated by Django 2.0.7 on 2018-07-17 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reptile_app', '0009_auto_20180717_1745'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vet',
            name='lat',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='vet',
            name='long',
            field=models.FloatField(null=True),
        ),
    ]
