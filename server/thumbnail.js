const querynyaa = require('./query');
const multernyaa = require('./multer');
const path = require('path');
const fs = require('fs');
const gm = require('gm');
async function open_files(req,hash){
    await multernyaa.destination_check(req);
    let result = await querynyaa.openfiles(hash);
    return result;
}
async function thumbnailmake(original_path,thumbnail_path){
    return new Promise( (resolve,reject) => {
        try {
            let readStream = fs.createReadStream(original_path);
            let writeStream = fs.createWriteStream(thumbnail_path);
            gm(original_path).autoOrient().noProfile().resize(300,200,'^').gravity('Center').crop('400','700').write(thumbnail_path,(err) => {
                if(err) console.log(err);
                resolve();
            })
        }
        catch (err) {
          reject(err);
        }
    });
};


exports.thumb = async function(ctx){
    switch(ctx.params.version){
        case "v1":
            switch(ctx.params.files){
                case "files":
                    let getfile = await open_files(ctx.req,ctx.params.hash);
                    let original_path = getfile.path; 
                    let thumbnail_path = getfile.thumbnail_path;
                    let checktype = getfile.type.split('/')[0];
                    ctx.type = getfile.type;
                    if(ctx.query.type == "thumb"){
                        if(checktype = "image"){
                            let existcheck = fs.existsSync(thumbnail_path);
                            if(!existcheck){
                            let tempdata = await thumbnailmake(original_path,thumbnail_path);
                            }
                            return fs.readFileSync(thumbnail_path);
                        }
                    }else{
                        return fs.readFileSync(getfile.path);
                    }
                break;
            }
        break;
    }
}