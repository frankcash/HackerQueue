const { Pool } = require('pg')

const url = require('url');

const params = url.parse(process.env.DATABASE_URL);
const nossl = process.env.NOSSL || false;
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: !nossl 
};

const pool = new Pool(config)


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
