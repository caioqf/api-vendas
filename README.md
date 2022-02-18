# Notas:

##### Imagem docker PostgreSQL: 
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5431:5432 -d postgres


##### Imagem docker REDIS: 
$ docker run --name redis -p 6379:6379 -d -t redis:alpine


##### Imagem docker REDISInsight
$ docker run -v redisinsight:/db -p 8001:8001 redislabs/redisinsight:latest



### Pontos de atenção:

-
