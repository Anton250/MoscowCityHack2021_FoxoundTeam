#!/bin/bash

pip3 install Django djangorestframework
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver