FROM php:8.2-apache
RUN apt-get update && apt-get install -y unzip libssl-dev
RUN pecl install mongodb && docker-php-ext-enable mongodb
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock ./
# para instalar el driver de mongoDB:
# docker exec juego-parejas composer update