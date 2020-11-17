# pull official NodeJS base image latest stable alias build
FROM node:14.15.0 as build

# build location
WORKDIR /roClient

ENV PATH /roClient/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

# npm clean install
RUN npm ci
RUN npm install react-scripts@3.4.1 -g

COPY . ./

RUN npm run build

## NginX
# running on nginx webserver for prod env latest stable
FROM nginx:1.18.0
# copy from alias build
COPY --from=build /roClient/build /usr/share/nginx/html
# next line if using react router
COPY nginx /etc/nginx/conf.d/default.conf

VOLUME /var/log/nginx
# port 80 HTTP
EXPOSE 80
#STOPSIGNAL SIGTERM
# launch nginx
CMD ["nginx", "-g","daemon off;"]
