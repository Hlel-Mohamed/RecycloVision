FROM node:21.2.0-alpine as react_build

WORKDIR /app

COPY . /app/ 

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=react_build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80 

CMD ["nginx","-g","daemon off;"]