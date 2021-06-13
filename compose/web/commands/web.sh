#!/bin/sh

set -e

python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py initadmin

uwsgi --ini uwsgi.ini
