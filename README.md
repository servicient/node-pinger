node-pinger
===========

Just another uptime pinging service.

Requires
--------

- Node 0.10.x
- MongoDB

Usage
-----

```
cp .env.example .env # and update accordingly
# db.sites.insert("active" : "1", "contactEmail" : "test@example.com", "contactName" : "Joe", "ip" : "127.0.0.1", "name" : "localhost", "url" : "http://localhost:3000" })
npm install
npm start
```

Maintained by
-------------

MTL Dev
lukewendling