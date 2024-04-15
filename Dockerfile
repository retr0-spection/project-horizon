# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV production
ENV PORT 80

# Setting up the work directory
WORKDIR /web

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "npm", "run", "start" ]

# Exposing server port
EXPOSE 3000 80