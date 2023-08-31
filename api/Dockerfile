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
ENV DEBUG_ARG="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
ARG APP_DIR
ARG DEV
WORKDIR $APP_HOME
COPY --from=BUILD $APP_HOME/$APP_DIR/build/libs/${APP_DIR}-HEAD-SNAPSHOT.jar /app/spring-boot-application.jar
ENTRYPOINT if [ "$DEV" = "true" ] ; then java $DEBUG_ARG -jar -Dspring.profiles.active=docker /app/spring-boot-application.jar ; else java -jar -Dspring.profiles.active=docker /app/spring-boot-application.jar ; fi