# Troper Web Client

This project was developed using React.

## Project Execution Method

API communication is possible only when SSL authentication is obtained.

#### Nginx .conf File

Put the build path of the project in the root part.

```
server {
  listen 80;

  location /api {
        proxy_pass http://127.0.0.1:8080;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        send_timeout 300;
  }
  location /file {
        proxy_pass http://127.0.0.1:8080;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        send_timeout 300;
  }
  location / {
    root   /home/ubuntu/review-analysis-web-report/client/build;
    index  index.html index.htm;
    try_files $uri /index.html;
  }
}
```

#### command order of execution

```$ yarn build```

```$ sudo systemctl stop nginx```

```$ sudo systemctl start nginx```

#### core NPM Dependency


