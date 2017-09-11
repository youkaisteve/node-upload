import path from'path'

import mkdirp from 'mkdirp'
import multer from 'multer'
import md5 from "crypto-md5"
import config from '../configuration'

let storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: function (req, file, cb) {
        let category = req.query.category || ''
        let bizPath = path.join(config.uploader.upload_base, category)
        mkdirp.sync(bizPath)
        cb(null, bizPath)
    },
    //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, md5(file.fieldname + new Date().getMilliseconds(), 'hex') + "." + fileFormat[fileFormat.length - 1]);
    }
});

//添加配置文件到muler对象。
export default multer({
    storage: storage,
    //其他设置请参考multer的limits
    //limits:{}
});