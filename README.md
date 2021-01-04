<div align="center">
  <img src="./docs/images/logo/doccano.png">
</div>

# doccano

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/98a0992c0a254d0ba23fd75631fe2907)](https://app.codacy.com/app/Hironsan/doccano?utm_source=github.com&utm_medium=referral&utm_content=doccano/doccano&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.com/doccano/doccano.svg?branch=master)](https://travis-ci.com/doccano/doccano)

doccano is an open source text annotation tool for humans. It provides annotation features for text classification, sequence labeling and sequence to sequence tasks. So, you can create labeled data for sentiment analysis, named entity recognition, text summarization and so on. Just create a project, upload data and start annotating. You can build a dataset in hours.

## Features

- Collaborative annotation
- Multi-language support
- Mobile support
- Emoji :smile: support
- Dark theme
- RESTful API

## Usage

Two options to run doccano:

- production,
- development.

To use doccano, please follow:

### Install dependencies

You need to install dependencies:

- [Git](https://git-scm.com),
- [Docker](https://www.docker.com),
- [Docker Compose](https://docs.docker.com/compose).

### Get the code

You need to clone the repository:

```bash
$ git clone https://github.com/doccano/doccano.git
$ cd doccano
```

_Note for Windows developers:_ Be sure to configure git to correctly handle line endings or you may encounter `status code 127` errors while running the services in future steps. Running with the git config options below will ensure your git directory correctly handles line endings.

```bash
git clone https://github.com/doccano/doccano.git --config core.autocrlf=input
```

### Production

Set the superuser account credentials in the `docker-compose.prod.yml` file:

```yml
ADMIN_USERNAME: "admin"
ADMIN_PASSWORD: "password"
```

If you use Google Analytics, set the tracking:

```yml
GOOGLE_TRACKING_ID: "UA-12345678-1"
```

Run doccano:

```bash
$ docker-compose -f docker-compose.prod.yml up
```

Go to <http://0.0.0.0/>.

<!--

### Docker

As a one-time setup, create a Docker container for Doccano:

```bash
docker pull doccano/doccano
docker container create --name doccano \
  -e "ADMIN_USERNAME=admin" \
  -e "ADMIN_EMAIL=admin@example.com" \
  -e "ADMIN_PASSWORD=password" \
  -p 8000:8000 doccano/doccano
```

Next, start Doccano by running the container:

```bash
docker container start doccano
```

To stop the container, run `docker container stop doccano -t 5`.
All data created in the container will persist across restarts.

Go to <http://127.0.0.1:8000/>.

-->

### Development

Set the superuser account credentials in the `docker-compose.dev.yml` file:

```yml
ADMIN_USERNAME: "admin"
ADMIN_PASSWORD: "password"
```

Run Doccano:

```bash
$ docker-compose -f docker-compose.dev.yml up
```

Go to <http://127.0.0.1:3000/>.

### Add annotators (optionally)

If you want to add annotators/annotation approvers, see [Frequently Asked Questions](./docs/faq.md)

## Contribution

As with any software, doccano is under continuous development. If you have requests for features, please file an issue describing your request. Also, if you want to see work towards a specific feature, feel free to contribute by working towards it. The standard procedure is to fork the repository, add a feature, fix a bug, then file a pull request that your changes are to be merged into the main repository and included in the next release.

Here are some tips might be helpful. [How to Contribute to Doccano Project](https://github.com/doccano/doccano/wiki/How-to-Contribute-to-Doccano-Project)

## Citation

```tex
@misc{doccano,
  title={{doccano}: Text Annotation Tool for Human},
  url={https://github.com/doccano/doccano},
  note={Software available from https://github.com/doccano/doccano},
  author={
    Hiroki Nakayama and
    Takahiro Kubo and
    Junya Kamura and
    Yasufumi Taniguchi and
    Xu Liang},
  year={2018},
}
```

## Contact

For help and feedback, please feel free to contact [the author](https://github.com/Hironsan).
