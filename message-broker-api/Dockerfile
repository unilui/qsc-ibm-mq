# Step 1: Build stage using Maven to build the application
FROM maven:3.9.6-amazoncorretto-17 AS build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY ./message-broker-api/pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the project files
COPY ./message-broker-api/src ./src

COPY FirebaseServiceKey.json ./src/main/resources/

# Build the application
RUN mvn clean package -DskipTests

# Step 2: Runtime stage - using Amazon Corretto JDK
FROM amazoncorretto:17-alpine

# Install OpenSSL for generating the certificate
RUN apk add --no-cache openssl

# Generate a self-signed SSL certificate using OpenSSL
RUN mkdir -p /etc/ssl/private && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/selfsigned.key \
    -out /etc/ssl/private/selfsigned.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Org/CN=localhost"

# Generate a PKCS12 keystore from the self-signed certificate
RUN openssl pkcs12 -export \
    -in /etc/ssl/private/selfsigned.crt \
    -inkey /etc/ssl/private/selfsigned.key \
    -out /etc/ssl/private/keystore.p12 \
    -name selfsigned \
    -password pass:changeit

WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080
EXPOSE 8443

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
