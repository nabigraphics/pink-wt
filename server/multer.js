const path = require('path');
const fs = require('fs');
const hashgen = require('./hashgen');
async function mkdirSync (directory) {
    if(fs.existsSync(directory)){
        return;
    }
    await fs.mkdir(directory,(err) => {
        if(err) {
            console.log(directory + "  ==  err!");
        }else{
            console.log(directory + "  ==  ok!");
        }
        return;
    })
    return;
}

async function dirCheckSync (result) {
    return result.map(async (directory,i) => {
        await mkdirSync(directory);
    })
}

exports.destination_check = async function(req) {
    const uploads_directory = path.resolve(__dirname + "/../uploads/");
    const files_directory = path.resolve(__dirname + "/../uploads/files/");
    const thumbnails_directory = path.resolve(__dirname + "/../uploads/thumbnails/");
    const users_directory = await path.resolve(files_directory + "/" + req.user.uuid + "/");
    const users_thumb_directory = await path.resolve(thumbnails_directory + "/" + req.user.uuid + "/");
    const chkd_result = await [uploads_directory,files_directory,thumbnails_directory,users_directory,users_thumb_directory];
    await dirCheckSync(chkd_result);
    return users_directory;
}

exports.makefilename = async function(req,file){
    let hash = await hashgen.file(req,file);
    const filetype = file.originalname.substring(file.originalname.lastIndexOf("."),file.originalname.length);
    return hash+filetype;
}