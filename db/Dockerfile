FROM mysql:8.0

ENV TZ=Asia/Tokyo

COPY ./db/my.conf /etc/mysql/conf.d/my.conf

CMD [ "mysqld", "--character-set-server=utf8", "--collation-server=utf8_unicode_ci" ]
