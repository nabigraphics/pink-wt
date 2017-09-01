const path = require('path');
const fs = require('fs');
const hashgen = require('./hashgen');
exports.uploads_directory = path.resolve(__dirname + "/../uploads/");
exports.files_directory = path.resolve(__dirname + "/../uploads/files/");
exports.thumbnails_directory = path.resolve(__dirname + "/../uploads/thumbnails/");
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
    const users_directory = await path.resolve(exports.files_directory + "/" + req.user.uuid + "/");
    const users_thumb_directory = await path.resolve(exports.thumbnails_directory + "/" + req.user.uuid + "/");
    const chkd_result = await [exports.uploads_directory,exports.files_directory,exports.thumbnails_directory,users_directory,users_thumb_directory];
    await dirCheckSync(chkd_result);
    return await users_directory;
}

exports.makefilename = async function(req,file){
    let hash = await hashgen.file(req,file);
    const filetype = file.originalname.substring(file.originalname.lastIndexOf("."),file.originalname.length);
    return await hash+filetype;
}