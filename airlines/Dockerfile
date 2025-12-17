# Step 1: Use an official Gradle image to build the application
FROM gradle:8.3.0-jdk17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Build the application
RUN gradle clean bootJar

# Step 2: Use a lightweight JDK image for running the app
FROM eclipse-temurin:17


# Set the working directory for the runtime container
WORKDIR /app

# Copy app and agent
COPY --from=build /app/build/libs/*.jar app.jar
COPY ./grafana-opentelemetry-java.jar grafana-opentelemetry-java.jar

# Default OTEL config (override at runtime with -e)
ENV OTEL_RESOURCE_ATTRIBUTES="service.name=airlines,service.namespace=pov-sim,deployment.environment=dev,service.version=v2"
ENV OTEL_EXPORTER_OTLP_ENDPOINT=http://alloy:4317
ENV OTEL_EXPORTER_OTLP_PROTOCOL=grpc

# Expose the port the application runs on
EXPOSE 8080

# Start Alloy in the background, then start the app with the Java agent
ENTRYPOINT ["sh", "-c", "exec java -javaagent:/app/grafana-opentelemetry-java.jar -jar /app/app.jar"]