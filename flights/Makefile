APP_NAME = flights
PORT = 5001

build:	
	docker build -t $(APP_NAME) .	

run:	
	docker run -p $(PORT):$(PORT) $(APP_NAME)	

start:	
	make build	
	make run	

stop:	
	docker stop $$(docker ps -q --filter ancestor=$(APP_NAME)) || true	

clean:	
	docker rm $$(docker ps -a -q --filter ancestor=$(APP_NAME)) || true	

.PHONY: build run start stop clean
