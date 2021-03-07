module.exports = () => {
    const multer = require('multer')
    const MulterTool = require('../utils/uploadTool.js')
    // 定义multer的fileFiter属性。
    const fileFilter = function(req, file, cb) {
        const multerTool = new MulterTool(file.fieldname, file.mimetype, {
            picture: {
                // 这里，field 和 格式，是使用者，定义的。之间没有强耦合关系
                type: 'image',
                rule: ['image/png', 'image/jpg', 'image/jpeg', 'image/*'],
                message: '文件类型不支持。请选择.png .jpg .jpeg'
            },
            mp3: {
                type: 'audio',
                rule: ['audio/mp3', 'audio/mpeg'],
                message: '文件类型不支持。请选择.mp3 .mpeg等'
            },
            photo: {
                type: 'image',
                rule: ['image/png', 'image/jpg', 'image/jpeg', 'image/*'],
                message: '文件类型不支持。请选择.png .jpg .jpeg'
            }
        })
        const result = multerTool.fileFilter()

        if (!result.pass) {
            req.err = result.message
        }

        cb(null, result.pass)
    }

    // 定义multer的diskStorage存储引擎。
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const fs = require('fs')
            const path = __dirname + `/../public/upload/${req.params.category}`
            const bln = fs.existsSync(path)
            if (!bln) {
                fs.mkdirSync(path)
            }
            cb(null, path)
        },
        filename: function(req, file, cb) {
            let filename = file.originalname.split('.') // 文件名，文件后缀
            cb(null, `${Date.now()}.${filename[filename.length - 1]}`) //参数1 null ,参数2 时间戳+后缀
        }
    })

    return multer({
        // dest: __dirname + '/../public/upload',
        storage: storage,
        fileFilter: fileFilter
    })
}
