<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Template</h1>

<p align="center">A robust and scalable server-side application framework</p>


## Project Overview

This project is a NestJS template designed to kickstart your server-side application development with a robust and scalable framework. It includes personal configurations to streamline your setup process.

## Key Features

- **Yarn** for package management
- Custom **Prettier** and **ESLint** configurations
- **lint-staged** for automatic linting on commit
- Integrated with **PostgreSQL**, **Redis**, and **Redis Sentinel**
- Easy setup with **Docker Compose**

## Installation and Setup

### Running the Application

To run the application, use Docker Compose:

```bash
$ docker-compose up
```

### Environment Configuration

Users can modify the default settings through the `.env` file. Simply run Docker Compose to set up the database and cache server effortlessly. If Redis Sentinel cannot find Redis, restart with the following commands:

```bash
$ docker-compose down -v
$ docker-compose up
```

## Contact

- Author - cozy


## License

Nest is [MIT licensed](LICENSE).
