FROM gradle:7.5.1-jdk11 AS BUILD
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
ARG APP_DIR
COPY $APP_DIR $APP_HOME/$APP_DIR
COPY shared $APP_HOME/shared
WORKDIR $APP_HOME/$APP_DIR
RUN gradle clean bootJar -i --no-daemon

FROM openjdk:11
ENV APP_HOME=/usr/app/
ARG APP_DIR
WORKDIR $APP_HOME
COPY --from=BUILD $APP_HOME/$APP_DIR/build/libs/${APP_DIR}-HEAD-SNAPSHOT.jar /app/spring-boot-application.jar
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar","-Dspring.profiles.active=docker","/app/spring-boot-application.jar"]