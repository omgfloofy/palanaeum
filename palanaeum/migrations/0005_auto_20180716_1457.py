# Generated by Django 2.0.7 on 2018-07-16 14:57

import django.db.models.manager
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('palanaeum', '0004_auto_20180706_1802'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='entryversion',
            managers=[
                ('newest', django.db.models.manager.Manager()),
            ],
        ),
        migrations.RemoveField(
            model_name='entry',
            name='date',
        ),
        migrations.RemoveField(
            model_name='entry',
            name='paraphrased',
        ),
        migrations.RemoveField(
            model_name='entry',
            name='tags',
        ),
        migrations.RemoveField(
            model_name='urlsource',
            name='entries',
        ),
        migrations.AlterField(
            model_name='entryversion',
            name='tags',
            field=models.ManyToManyField(related_name='versions', to='palanaeum.Tag'),
        ),
    ]
