
# revoverflow-frontend
RevOverflow React Frontend.

In your project directory you can run:

### `git clone https://github.com/201026java/revoverflow-frontend.git`

### `cd revoverflow-frontend`

### `npm install`

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build a docker container on a dev environment:

### `docker build -f Dockerfile.dev -t revoverflow-frontend:dev .`

To run your freshly built container:

### `docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 revoverflow-frontend:dev`

To build a production ready container:

### `docker build -t revoverflow-frontend:latest .`

Then run it:

### `docker run -it --rm -p 3000:80 revoverflow-frontend:latest`

To build with docker-compose:

###`docker-compose -f docker-compose.yml up -d --build`

Verify the container is running:
###`docker ps`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
