module.exports = {
    db: 'mongodb://10.2.1.49:27017/cargopik_db_dev',  /* Live DB URL 10.2.1.62 */
    mongoDBOptions : {
        db: { native_parser: true },
        server: { poolSize: 5 },
        // user: 'indianic',
        // pass: 'indianic@123'
    },
    sessionSecret: 'indNIC2305',
    securityToken: 'indNIC2305',
    baseApiUrl: '/api',
    serverPort: '4015',
    tokenExpiry: 361440, // Note: in seconds! (1 day)
    adminEmails: 'chandrakanta@indianic.com,chandrakanta1@indianic.com,chandrakanta2@indianic.com',
    rootURL : "http://nodejs.indianic.com:4015/admin/#/"
};

/*use meandb_new
db.createUser({user: "indianic",pwd: "indianic@123", roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})*/