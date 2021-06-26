FROM python:3.8

WORKDIR /web-app-movizrating

COPY ./api ./api
COPY ./movizrating ./movizrating
COPY ./manage.py .
COPY ./requirements.txt .
COPY db.sqlite3 .
RUN pip install -r requirements.txt
RUN python manage.py migrate