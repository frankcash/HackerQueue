FROM mhart/alpine-node:12

# cache package.json and node_modules to speed up builds
ADD package.json package.json
RUN npm install

# Add your source files
ADD . .
EXPOSE 3000

CMD ["npm", "start"]