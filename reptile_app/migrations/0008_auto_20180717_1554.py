# Generated by Django 2.0.7 on 2018-07-17 15:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reptile_app', '0007_contact'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Contact',
            new_name='Message',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='message',
            new_name='message_text',
        ),
    ]
