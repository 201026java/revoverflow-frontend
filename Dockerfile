# pull official NodeJS base image latest stable alias build
FROM node:14.15.0 as build




# build location
WORKDIR /roClient
<<<<<<< HEAD
#RUN mkdir -v /roClient && cd /roClient
ENV PATH /roClient/node_modules/.bin:$PATH

=======

ENV PATH /roClient/node_modules/.bin:$PATH
>>>>>>> adc3409... Changes to dockerfile, docker compose, kubernetes deployment. Removed unnecessary files. Removed node.yml. Renamed ro-frontend.tml to build.yml. Changes to build.yml

COPY package.json ./
COPY package-lock.json ./

# npm clean install
RUN npm ci
RUN npm install react-scripts@3.4.1 -g

VOLUME /roClient/roClient-sonar

COPY . ./

RUN npm run build
#CMD ["whoami"]

## NGINX
# running on nginx webserver for prod env latest stable
FROM nginx:1.18.0

VOLUME /var/log/nginx

# mv prod build to www folder
# copy from alias build
COPY --from=build /roClient/build /usr/share/nginx/html
# next line if using react router
COPY nginx /etc/nginx/conf.d/default.conf

VOLUME /roClient/roClient-sonar
VOLUME /var/log/nginx
# port 80 HTTP
EXPOSE 30080
#STOPSIGNAL SIGTERM
# launch nginx
CMD ["nginx", "-g","daemon off;"]
