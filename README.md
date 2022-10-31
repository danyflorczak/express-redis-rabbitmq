## First App publisher.js 
1. Listen for Post request on /add ( Json Format ) </br>
2. Than send it to rabbitmq queue</br>
```
# To run use:
$ node publisher.js
```

## Second App consumer.js
1. Consumes data from rabbitmq queue </br>
2. Than save it to Redis.</br>
```
# To run use:
$ node consumer.js
```

## Third App explorer.js
1. Show size of database</br>
```
# To run use:
$ node explorer.js
```
