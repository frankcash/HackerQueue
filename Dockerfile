FROM nodesource/jessie:6

# cache package.json and node_modules to speed up builds
ADD package.json package.json
RUN npm install

# Add your source files
ADD . .
EXPOSE 3000
ENV DATABASE_URL postgres://hacker:hackerx@127.0.0.1:5432/hackerqueue
CMD ["npm","start"]