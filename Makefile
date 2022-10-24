build:
	docker build -t check .
run:
	docker run -p 80:3000 --env-file ./config/.env --rm --name check check
stop:
	docker stop check