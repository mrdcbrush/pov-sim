# Use the official Python 3.8 image as the base image
FROM python:3.8-slim-buster

# Set the working directory inside the container
WORKDIR /python-docker

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install the required dependencies
RUN pip3 install -r requirements.txt && opentelemetry-bootstrap --action=install

# Copy the rest of your application code into the container
COPY . .

# OTEL Configuration
ENV OTEL_RESOURCE_ATTRIBUTES="service.name=flights,service.namespace=pov-sim,deployment.environment=dev,service.version=v2,service.instance.id=flights-${HOSTNAME}"
ENV OTEL_EXPORTER_OTLP_ENDPOINT=http://alloy:4317
ENV OTEL_EXPORTER_OTLP_PROTOCOL=grpc
ENV OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true
ENV OTEL_METRICS_EXPORTER=console,otlp
ENV OTEL_LOGS_EXPORTER=console,otlp
ENV OTEL_TRACES_EXPORTER=console,otlp

# Set Pyroscope environment variables  
ENV PYROSCOPE_APPLICATION_NAME=flights  
ENV PYROSCOPE_SERVER_ADDRESS=http://alloy:4040  
ENV PYROSCOPE_LABELS=service.instance.id=${HOSTNAME},namespace=pov-sim

# Expose port 5001
EXPOSE 5001

# Specify the command to run your Flask app
CMD ["opentelemetry-instrument", "python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=5001"]
