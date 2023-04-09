const sharp=require('sharp');
const multer= require('multer');
const path= require('path');

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, '../storage/imgs/movies/'));
    },
    filename:(req,file,cb)=>{
        const ext=file.originalname.split('.').pop();
        const filename= req.body.filename;
        cb(null,`${filename}.${ext}`)
    }     
})
const upload=multer({storage});

module.exports = {
    upload
};
  