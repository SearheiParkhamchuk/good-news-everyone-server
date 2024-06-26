###################
# BUILD STAGE
###################

FROM node:18-alpine As build

WORKDIR /usr/src/good-news-everyone-server

COPY package.json package-lock.json ./

RUN npm install --verbose

COPY . .

RUN npm run build

###################
# PRODUCTION STAGE
###################

FROM node:18-alpine As production

WORKDIR /usr/src/good-news-everyone-server

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/good-news-everyone-server/dist ./dist
COPY package.json package-lock.json ./

RUN npm install --verbose --only=production

# Start the server using the production build
CMD ["node", "dist/src/main.js"]