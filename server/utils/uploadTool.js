module.exports = class MulterTool {
    constructor(field, mimetype, options) {
        // 参数(req, file, cb, options)：req,file,cb 都是对象，传递的是地址。但函数内部的req和外部req是两个不同的变量。
        // 改造(field, mimetype, options)：解除，依赖外界对象的耦合度。这里只要传递，field、mimetype。就可以做通用验证。
        // 设置默认options ？？？
        this.field = field
        this.mimetype = mimetype
        this.options = options
    }

    // 文件类型等验证方法。
    fileFilter() {
        const fieldNames = Object.keys(this.options) // 所有的验证field name
        for (let i = 0; i < fieldNames.length; i++) {
            // 该条件：验证表单域 music picture...
            if (this.field === fieldNames[i]) {
                const fieldRules = this.options[fieldNames[i]].rule
                const fieldType = this.options[fieldNames[i]].type
                // 该条件： 上传文件类型，不是指定文件类型。
                if (this.mimetype.indexOf(fieldType) !== 0) {
                    return {
                        pass: false,
                        message: this.options[fieldNames[i]].message
                    }
                }

                // 该条件，验证rule中是否含有 ' xxxx/* 格式 '
                if (this.isAllFormat(this.field)) {
                    return {
                        pass: true,
                        message: this.field + '上传成功！'
                    }
                }

                // 该条件：不存在 ' xxxx/* ', 判断 是否 不在数组中。
                if (!fieldRules.includes(this.mimetype)) {
                    return {
                        pass: false,
                        message: this.options[fieldNames[i]].message
                    }
                }
                // 通过
                return {
                    pass: true,
                    message: this.field + '上传成功！'
                }
            }
        }

        // 都没有设置相应的表单域name。说明是不允许的。
        return {
            pass: false,
            message: '存在不包含的表单域field'
        }
    }

    // 工具
    isAllFormat(field) {
        const fieldRule = this.options[field].rule
        const fieldType = this.options[field].type
        const reg = new RegExp(fieldType + '(/\\*)$')

        for (let i = 0; i < fieldRule.length; i++) {
            if (reg.test(fieldRule[i])) {
                return true
            }
        }
        return false
    }
}
