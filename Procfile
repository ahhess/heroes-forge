web: java $JAVA_OPTS \
    -Dswarm.http.port=$PORT \
    -Dswarm.datasources.data-sources.heroesDS.driver-name=postgresql \
    -Dswarm.datasources.data-sources.heroesDS.connection-url=$JDBC_DATABASE_URL \
    -Dswarm.datasources.data-sources.heroesDS.user-name=$JDBC_DATABASE_USERNAME \
    -Dswarm.datasources.data-sources.heroesDS.password=$JDBC_DATABASE_PASSWORD \
    -jar target/heroes-thorntail.jar
