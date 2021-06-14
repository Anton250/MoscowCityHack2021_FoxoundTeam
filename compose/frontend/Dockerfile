# develop stage
FROM node:13.14-alpine as develop-stage
WORKDIR /app
COPY ./foxhound_front/package*.json ./
RUN npm i -g @vue/cli@latest
COPY ./foxhound_front .

# build stage
FROM develop-stage as build-stage
RUN apk add git
RUN npm i
RUN npm run build

# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
