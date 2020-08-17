FROM php:7.3-fpm

LABEL Sadao Yokoyama <sadaoyokoyama@live.com>

RUN apt-get update && apt-get install -y -q build-essential sudo openssl libssl-dev pkg-config wget git sysstat gnupg2 sqlite3 libpq-dev libsqlite3-dev zlib1g-dev libicu-dev g++ xz-utils python --no-install-recommends

RUN mkdir -p /opt/node && cd /opt/node && \
    wget -q https://nodejs.org/dist/v8.9.3/node-v8.9.3.tar.gz && \
    tar -xvf node-v8.9.3.tar.gz && rm node-v8.9.3.tar.gz && \
    cd node-v8.9.3 && \
    ./configure && \
    make && \
    make install

RUN yes | pecl install xdebug \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_autostart=off" >> /usr/local/etc/php/conf.d/xdebug.ini

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-configure intl && \
    docker-php-ext-install pdo pdo_pgsql pdo_mysql pdo_sqlite intl && \
    docker-php-ext-enable xdebug

RUN git clone http://github.com/redis/hiredis \
	&& cd hiredis \
	&& make \
    && make install

RUN git clone https://github.com/nrk/phpiredis.git  \
    && cd phpiredis \
    && phpize && ./configure --enable-phpiredis \
    && make \
    && make install

RUN adduser --disabled-password --gecos '' sadao
RUN adduser sadao sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER sadao