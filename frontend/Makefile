IMAGE_NAME := react-app
CONTAINER_NAME := react-app-container
HOST_PORT := 3000
CONTAINER_PORT := 80

.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .

.PHONY: run
run:
	docker run --name $(CONTAINER_NAME) -p $(HOST_PORT):$(CONTAINER_PORT) $(IMAGE_NAME)

.PHONY: stop
stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

.PHONY: shell
shell:
	docker exec -it $(CONTAINER_NAME) sh
