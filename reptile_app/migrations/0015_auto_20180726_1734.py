# Generated by Django 2.0.7 on 2018-07-26 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reptile_app', '0014_illness_species_affected'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='media/'),
        ),
        migrations.AlterField(
            model_name='vet',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='media/'),
        ),
    ]
