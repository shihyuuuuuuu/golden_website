# Generated by Django 2.2.5 on 2019-09-28 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20190928_1900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='day1',
            field=models.CharField(choices=[('6', 'Sunday'), ('0', 'Monday'), ('1', 'Tuesday'), ('2', 'Wednesday'), ('3', 'Thursday'), ('4', 'Friday'), ('5', 'Saturday')], help_text='星期幾', max_length=1),
        ),
        migrations.AlterField(
            model_name='course',
            name='day2',
            field=models.CharField(blank=True, choices=[('6', 'Sunday'), ('0', 'Monday'), ('1', 'Tuesday'), ('2', 'Wednesday'), ('3', 'Thursday'), ('4', 'Friday'), ('5', 'Saturday')], help_text='星期幾', max_length=1, null=True),
        ),
    ]
