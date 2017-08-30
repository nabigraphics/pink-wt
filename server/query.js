const mariadb = require('promise-mysql');
const hashgen = require('./hashgen');
const config = require('./config.json');
const connection = mariadb.createPool(config.database);

exports.findUser = async function(id,pw) {
    let find_result;
    let pwhash = await hashgen.pwgen(config.session_secret,id,pw);
    await connection.query(`SELECT * FROM ${config.userdb} where userid = "${id}" AND userpw = "${pwhash}" limit 1`).then((res) => {
        if(res.length != 0){
            find_result = {status:"login",data:res[0]};
        }else{
            find_result = {status:"error"};
        }
    }).catch(() => {
        find_result = {status:"error"};
    });
    return find_result;
}