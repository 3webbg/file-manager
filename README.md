![alt tag](http://24s.us/screenshot1.png)


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

## SERVER

A server is start at 127.0.0.1:5001

## API

- initialize() Initializes the widget

- .on(...) Listen for an event
    - delete
    - create
    - edit
    - navigate
    
- set(paths) Sets an array of paths
    - 
    ```
    [
        {_id: 1, path: '/etc/etc-sub-dir/sub-sub-etc-dir/file'},
        {_id: 2, path: '/etc/etc-sub-dir/sub-sub-etc-dir/file1'},
        {_id: 3, path: '/etc/file3'},
        {_id: 4, path: '/etc/etc-sub-dir/sub-sub-etc-dir2/file5'},
        {_id: 5, path: '/tmp/dir-test/qwe2'},
        {_id: 6, path: '/tmp/dir-test-1/qwe'},
        {_id: 7, path: '/tmp/dir-test/qwe3'}
    ]
    ```

- append(path) Appends a path to current array
    -
    ```
    {_id: 1, path: '/etc/etc-sub-dir/sub-sub-etc-dir/file'}
    ```
    
- get() Gets all paths

- getEmitter() Gets the event emitter
    - on()
    - off()
    - once()
    - emitDelete()
    - emitCreate()
    - emitEdit()
    - emitNavigate()

## Example

An example can be found in:
##### src/views/layout/default.html

##### * Notice the \<div id="container"\>\</div\> it's required.

```
    var FileManagerObject = new FileManagerAPI();
    
    FileManagerObject.set([
        {_id: 1, path: '/etc/etc-sub-dir/sub-sub-etc-dir/file'},
        {_id: 2, path: '/etc/etc-sub-dir/sub-sub-etc-dir/file1'},
        {_id: 3, path: '/etc/file3'},
        {_id: 4, path: '/etc/etc-sub-dir/sub-sub-etc-dir2/file5'},
        {_id: 5, path: '/tmp/dir-test/qwe2'},
        {_id: 6, path: '/tmp/dir-test-1/qwe'},
        {_id: 7, path: '/tmp/dir-test/qwe3'}
    ]);
    
    FileManagerObject.on('delete', function(filename, key) {
        console.log("Delete file " + filename + " with key " + key);
    });
    
    FileManagerObject.on('create', function(filename, key) {
        console.log("Create file " + filename + " with key " + key);
    });
    
    FileManagerObject.on('edit', function(filename, oldname, key) {
        console.log("Edit file " + oldname + " with new name " + filename + " and key " + key);
    });
    
    FileManagerObject.on('navigate', function(path, isdir) {
        console.log("Navigate to " + path, ' Is directory ' + isdir);
    });
    
    FileManagerObject.initialize();
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