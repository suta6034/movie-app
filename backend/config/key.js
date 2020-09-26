if(process.env.NODE_ENV === 'production'){
    console.log('node env? ',process.env.NODE_ENV);
    module.exports = require('./prod')
}else{
    console.log('node env? ',process.env.NODE_ENV);
    module.exports = require('./dev')
}