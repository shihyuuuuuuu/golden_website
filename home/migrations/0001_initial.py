# Generated by Django 2.2.5 on 2019-09-28 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='課程名稱', max_length=100)),
                ('teacher', models.CharField(help_text='授課教師', max_length=20)),
                ('department', models.CharField(choices=[('0', '英文部'), ('1', '數理部'), ('2', '科技教育中心')], help_text='開班部門', max_length=1)),
                ('day1', models.CharField(choices=[('0', 'Sunday'), ('1', 'Monday'), ('2', 'Tuesday'), ('3', 'Wednesday'), ('4', 'Thursday'), ('5', 'Friday'), ('6', 'Saturday')], help_text='星期幾', max_length=1)),
                ('day1_start_time', models.TimeField()),
                ('day1_end_time', models.TimeField()),
                ('day2', models.CharField(choices=[('0', 'Sunday'), ('1', 'Monday'), ('2', 'Tuesday'), ('3', 'Wednesday'), ('4', 'Thursday'), ('5', 'Friday'), ('6', 'Saturday')], help_text='星期幾', max_length=1)),
                ('day2_start_time', models.TimeField()),
                ('day2_end_time', models.TimeField()),
            ],
            options={
                'ordering': ['department'],
            },
        ),
    ]
