const redis = require('redis')


class RedisClient{
  constructor(){
    this.client = redis.createClient({
      url: 'redis://127.0.0.1:6379'
    });
    this.client.on('error', (err) => {
      console.log(err);
    });
  }
  isAlive = () => {
    this.client.on('connect', () => {
      console.log(true);
    });

    this.client.on('error', () => {
      console.log(false);
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient()

module.exports = redisClient;
