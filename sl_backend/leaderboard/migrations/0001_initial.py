# Generated by Django 3.1.5 on 2021-01-07 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StudentDetails',
            fields=[
                ('name', models.CharField(max_length=50)),
                ('rollno', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('math_marks', models.IntegerField()),
                ('physics_marks', models.IntegerField()),
                ('chemistry_marks', models.IntegerField()),
                ('total', models.IntegerField()),
                ('percentage', models.FloatField()),
            ],
            options={
                'verbose_name': 'StudentDetails',
                'verbose_name_plural': 'StudentDetailss',
            },
        ),
    ]