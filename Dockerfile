ARG PYTHON_VERSION="3.7"
FROM python:${PYTHON_VERSION}-slim-buster

CMD ["python3"]

WORKDIR /src
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./app/ /src/
COPY ./Pipfile* /src/
COPY ./tools/ /src/tools/
ENV DJANGO_SETTINGS_MODULE=app.settings
ENV PYTHONPATH=/src/

# hadolint ignore=DL3013
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    netcat=1.10-41.1 \
    libpq-dev=11.9-0+deb10u1 \
    unixodbc-dev=2.3.6-0.1 \
    g++=4:8.3.0-1 xz-utils curl nodejs npm dos2unix \
 && pip install --no-cache-dir pipenv==2020.11.15 \
 && pipenv install --system --deploy --ignore-pipfile \
 && pip uninstall -y pipenv virtualenv-clone virtualenv \
 && npm install npm@latest -g \
 && npm install pm2 -g \
 && npm install webpack-cli\
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* \
 && exec bash

RUN cd /src/server/static \
 && npm install \
 && npm run build



#RUN apt-get build-dep gcc python-dev musl-dev postgresql-dev