FROM python:3.8-slim-buster

WORKDIR /backend

COPY ./api ./api
COPY ./movizrating ./movizrating
COPY ./manage.py .
COPY ./requirements.txt .
RUN pip install -r requirements.txt
