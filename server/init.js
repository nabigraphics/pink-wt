const fs = require('fs');
const path = require('path');
const readline = require('readline');
const mariadb = require('promise-mysql');
const hashgen = require('./hashgen');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
console.log("Easy File Share Initlaize -");
console.log("-------------------------------------");
console.log("command - "+"\n"+"config - init config.json file."+"\n"+"admin - admin user regist"+"\n"+"exit - exit init.js");
console.log("-------------------------------------");
async function rlquerys(step) {
    return new Promise( (resolve,reject) => {
        try {
            switch(step){
                case 1:
                    return rl.question(`input secret key (Default : "easy-file-share") : `, (answer) => {
                        if(!answer){
                            resolve("easy-file-share");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 2:
                return rl.question(`input database host (Default : "localhost") : `, (answer) => {
                        if(!answer){
                            resolve("localhost");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 3:
                return rl.question(`input database port (Default : "3306") : `, (answer) => {
                        if(!answer){
                            resolve("3306");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 4:
                return rl.question(`input database user (Default : "root") : `, (answer) => {
                        if(!answer){
                            resolve("root");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 5:
                return rl.question(`input database password (Default : "root") : `, (answer) => {
                        if(!answer){
                            resolve("root");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 6:
                return rl.question(`input database name (Default : "efs_db") : `, (answer) => {
                        if(!answer){
                            resolve("efs_db");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 7:
                return rl.question(`input database connectionLimit (Default : "10") : `, (answer) => {
                        if(!answer){
                            resolve("10");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 8:
                return rl.question(`input userdb (Default : "userdb") : `, (answer) => {
                        if(!answer){
                            resolve("userdb");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 9:
                return rl.question(`input filesdb (Default : "filesdb") : `, (answer) => {
                        if(!answer){
                            resolve("filesdb");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case 10:
                return rl.question(`input sharesdb (Default : "sharesdb") : `, (answer) => {
                        if(!answer){
                            resolve("sharesdb");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case "adminid":
                return rl.question(`input admin id (Default : "admin") : `, (answer) => {
                        if(!answer){
                            resolve("admin");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
                case "adminpw":
                return rl.question(`input admin password (Default : "password") : `, (answer) => {
                        if(!answer){
                            resolve("password");
                        }else{
                            resolve(answer);
                        }
                    });
                break;
            }
        }
        catch (err) {
          reject(err);
        }
    });
}

async function initCheck(){
    let temp_config = {
        session_secret:await rlquerys(1),
        database:{
            host:await rlquerys(2),
            port:await rlquerys(3),
            user:await rlquerys(4),
            password:await rlquerys(5),
            database:await rlquerys(6),
            connectionLimit:await rlquerys(7)
        },
        userdb:await rlquerys(8),
        filesdb:await rlquerys(9),
        sharesdb:await rlquerys(10)
    }
    await fs.writeFile(path.resolve(__dirname + "/config.json"),JSON.stringify(temp_config),'utf8', (err) => {
        if(err) {
            console.log(err);
        }else{
            console.log("ok!");
        }
        rl.prompt();
    })
}

async function adminRegist(){
    let temp_config  = await JSON.parse(fs.readFileSync(path.resolve(__dirname + "/config.json"), 'utf8'));
    const connection = await mariadb.createPool(temp_config.database);
    let userid = await rlquerys("adminid");
    let userpw = await rlquerys("adminpw");
    let pwhash = await hashgen.pwgen(temp_config.session_secret,userid,userpw);
    let create_uuid = await hashgen.uuid(pwhash);
    await connection.query(`INSERT INTO ${temp_config.userdb} ( uuid, userid, userpw ) VALUES 
    (   "${create_uuid}",
        "${userid}",
        "${pwhash}"
    )`).then((res) => {
        console.log("ok");
    }).catch((err) => {
        console.log(err);
    })
}
rl.prompt();
rl.on('line', (line) => {
    switch (line.trim()) {
        case 'config':
            initCheck();
        break;
        case 'admin':
            adminRegist();
        break;
        case 'exit':
            process.exit(0);
        break;
    }
    rl.prompt();
}).on('close', () => {
    process.exit(0);
});