run app:
	docker-compose build \
	&& docker-compose up -d
setup:
	docker-compose exec client npx prisma generate \
	&& docker-compose exec client npx prisma migrate dev --name demo \
	&& docker-compose exec server poetry run python -m api.migrate
clean:
	docker-compose down --rmi all -v
