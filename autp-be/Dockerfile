FROM php:8.4-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    oniguruma-dev \
    zip \
    unzip \
    curl \
    git \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    zip \
    exif \
    pcntl \
    bcmath \
    opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
