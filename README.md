![alt tag](http://24s.us/screenshot.png)


# File manager
==========================

## Installation

##### OS X (DEV)
 
```
$ npm install && sudo npm install -g webpack mocha && cp dist.config.js config.js && brew install ruby && sudo gem install -n /usr/local/bin sass
```

##### OS X (PROD)
 
```
$ npm install && cp dist.config.js config.js
```

===

##### DEBIAN distros (DEV)
 
```
$ npm install && sudo npm install -g webpack mocha && cp dist.config.js config.js && sudo apt-get install ruby && sudo apt-get install ruby-sass
```

##### DEBIAN distros (PROD)
 
```
$ npm install && cp dist.config.js config.js
```

==========================


## Running WEB server (DEV)

```
export TZ=utc && grunt start
```

## Running WEB server (PROD)

Server must be set to UTC time zone

```
node app.js
```

## Optional


### NGINX

Use NGINX for reverse proxy & serving static content

Benefits:

- Serving static files more efficiently
- Not having to worry about permissions for the Node.js process
- Handles error pages if NODEJS server crashes
- Running multiple WEB servers
- It comes with built in security features
- and more ...

```
upstream resource {
    server 127.0.0.1:5001;
}

server {
    listen example.xxx:80;
    server_name example.xxx;

    proxy_set_header Host $host; 
    proxy_set_header X-Real-IP $remote_addr; 
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    proxy_set_header X-Forwarded-Proto http; 
    proxy_redirect off;

    location ~*  \.(jpg|jpeg|png|gif|ico|css|js)$ {
        root /www/path-to-resource/;
        expires 7d;
        add_header Pragma public;
        add_header Cache-Control "public";
    }
   
    location / {   
	
      # cross-origin HTTP request
      # include /etc/nginx/conf.d/cors.conf;

      access_log /var/log/nginx/resource.log;
      proxy_pass http://resource;
    }
 }
```

### PM2

PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.