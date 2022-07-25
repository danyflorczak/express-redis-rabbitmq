
# First App publisher.js 
Listen for Post request on /add ( Json Format ) </br>
Than send it to rabbitmq queue</br>
To run use:</br>
```bash
  node publisher.js
```

# Second App consumer.js
Consumes data from rabbitmq queue </br>
Than saving it to Redis.</br>
To run use:</br>
```bash
  node consumer.js
```

# Third App explorer.js
List back size of database</br>
To run use:</br>
```bash
  node explorer.js
```