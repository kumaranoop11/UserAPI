module.exports = {
    'secret': 'supersecret',
    'dbURL' : 'mongodb://127.0.0.1:27017/tms',
    'mdbURL': 'mongodb://testUser:testUser1@ds123852.mlab.com:23852/aktestdb'
}

var config = {
    development: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            host:   '127.0.0.1',
            port:   '27017',
            db:     'site_dev'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3422'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:     'site'
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '3421'
        }
    }
    };