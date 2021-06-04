FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy packages
COPY node_modules ./node_modules/
# Copy package.json and shrinkwrap file
COPY package.json npm-shrinkwrap.json ./
# Copy  ONLY compiled app source to ./build
COPY ./build/samplebase ./samplebase/

EXPOSE 33913
CMD [ "node", "./samplebase/app.js" ]