from django.contrib.auth.models import User
from django.core.management import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **options):
        if User.objects.count() == 0:
            u = User.objects.create_superuser(username='admin')
            u.set_password('qwerty1234')
            u.save()
            print('Created admin with username admin and password qwerty1234')
        else:
            print('Admin accounts can only be initialized if no Accounts exist')
