// 错误类名：用户传递，添加到表单域元素上。
//      1. 约定：默认field-error，需要用户在样式表中，添加该类名对应样式。
//      2. 约定：必填 ！！！不填报错。
//      3. 约定：必须为 合法的类选择器名称。
// 可以定义symbol

// 总结：一般这种表单，验证。基本上就是一个表单域对应一个input元素。特别的就是，复选框之类的。
// 设计初衷，给定验证对象，key对应验证的域。内部所有元素按照同一种规则。如果要细分，就要更细设计：一个元素，获取他的值，循环验证得出结果，设计该元素状态。绑定事件，就要细化，为一个input直接整体，为多个input，该每个input执行改变他自己的设计好的模块。至于每一项完成的success-active设计见原因2。
// 原因1：放置多个input元素，会导致，你触发事件，导致该表单域下所有的input都会重新验证。
// 原因2： input上不能设置伪元素，还是要在外部套div。那么直接作为container不更好。哈哈（设计初衷，后面想表达的一点。）
// 原因3： Trigger时，由于功能写的是以field域为划分变化，并没有以一个field下，一个内部元素为最小变化基础。
// 当时写的时候的想法。：如果抛弃上面的情况，也是可以实现的。只不过验证数据的结果，格式要调整一下，即包含整体结果true/false,也包含所有验证元素[true,msg...]。后期会用到。

export default class FormValidator {
    // 一些约定：实现高可维护，高拓展。
    static OppointNames = {
        FormItemContainer: 'data-field-container', // 约定，表单项容器
        FormValidatorSelector: 'data-field', // 约定，表单验证元素
        ValidatorAttr: 'data-field-attr', //约定，验证的属性值。
        ValidatorAttrDefault: 'value', //约定，验证的属性值。

        // 约定，触发相关项验证。同时，约定data-field-trigger='name-field name2-field' 格式，中间隔一个空格。
        TriggerElseFormItem: 'data-field-trigger',

        // 约定，事件类型
        ValidatorEventType: 'data-field-event', // 约定，验证时，通过什么事件触发验证。
        ValidatorEventTypeDefault: 'change', // 约定，默认值为change

        ErrorShowPosition: 'data-field-error' // 约定，错误信息暂时的位置。
        // ErrorShowClassDefault: 'error-msg' // 不应该这样这。不合理。限制了用户写样式。
    }

    static OppointStringRules = {
        required: function(value, msg) {
            const result = value.map(item => {
                if (item) {
                    return true
                } else {
                    return msg
                }
            })
            return result
        }
        // email: function(value, formValue) {}
    }

    constructor(options) {
        const optionsDefault = {
            el: null,
            errorClass: 'error-msg',
            containerClass: 'active',
            validators: {}
        }
        this.options = { ...optionsDefault, ...options } // 对options做兼容性处理。
        this.inint()
    }
    /**
     * 初始化
     */
    inint() {
        this.ValidatorItemsEvent()
    }

    // ------事件绑定------整体提交事件，交由用户处理。选择form提交还是自定义提交------------

    /**
     * 绑定所有验证元素的事件
     */
    ValidatorItemsEvent() {
        const allValidatorItems = this.getAllValidatorItems()
        const fields = Object.keys(this.options.validators)
        fields.forEach(item => {
            allValidatorItems[item].forEach(dom => {
                const eventName = this.getEventName(dom)
                dom.addEventListener(
                    eventName,
                    () => {
                        // 每次触发，重新设置状态。
                        // 第二，触发有data-field-trigger ,获取 field对象
                        const triggerName = this.getTriggerItemName(dom)
                        // null []
                        if (!triggerName) {
                            this.setStatus(item)
                            return
                        }
                        // 有值，合并。
                        triggerName.push(item)
                        this.setStatus(...triggerName)
                    },
                    false
                )
            })
        })
    }
    /**
     * 工具方法：获取验证元素，身上是否设置了指定Trigger 对象item。
     */
    getTriggerItemName(dom) {
        const triggerAttr = FormValidator.OppointNames.TriggerElseFormItem
        // 这里约定了，值得抒写格式
        let triggerName = dom.getAttribute(triggerAttr)
        if (!triggerName) {
            return null
        }
        return triggerName.split(' ')
    }
    /**
     * 工具方法：获取验证元素，身上是否设置了指定事件名。
     * @param {*} dom
     */
    getEventName(dom) {
        const eventAttr = FormValidator.OppointNames.ValidatorEventType
        const evnetAttrDefault =
            FormValidator.OppointNames.ValidatorEventTypeDefault
        let eventName = dom.getAttribute(eventAttr)
        if (!eventName) {
            eventName = evnetAttrDefault
        }
        return eventName
    }
    /**
     * 获取，form表单内所有验证的元素。
     */
    getAllValidatorItems() {
        const fields = Object.keys(this.options.validators)
        const allValidatorItems = {}
        fields.forEach(item => {
            allValidatorItems[item] = this.getValidatorItems(item)
        })
        return allValidatorItems
    }
    // ---------------------状态设置---------------------
    /**
     * 设置一个项内状态。
     * @param(*) field itemName
     */
    setItemStatus(field) {
        // 合理性判断
        const fields = Object.keys(this.options.validators)
        if (!fields.includes(field)) {
            throw new Error(
                field + ' is not exist in validators property of options'
            )
        }
        const itemResult = this.doValidatorItem(field)
        const errorClass = this.options.errorClass
        const ErrorPosition = this.getErrorPosition(field)
        if (!ErrorPosition) {
            throw new Error(
                'containerDom that show errorMessage is not exist！'
            )
        }

        // 设置错误位置状态。
        if (!itemResult.isPass) {
            ErrorPosition.classList.add(errorClass)
            ErrorPosition.innerHTML = itemResult.msg
        } else {
            // 设置成功状态。复选框也可以。container上设置。
            this.getItem(field).classList.add(this.options.containerClass)
            //同时恢复，错误信息。
            ErrorPosition.classList.remove(errorClass)
            ErrorPosition.innerHTML = ''
        }
    }

    /**
     * 设置整个表单状态。
     * 1. 没有参数，设置整个表单。
     * 2. 有参数，设置响应的表单域 @param(field,field...)
     */
    setStatus(...arg) {
        if (arg.length === 0) {
            // 设置真个表单域。
            const fields = Object.keys(this.options.validators)
            fields.forEach(item => {
                this.setItemStatus(item)
            })
            return
        }
        // 设置传来的字段
        arg.forEach(item => {
            this.setItemStatus(item)
        })
    }

    /**
     * 根据field，获取展示错误信息的元素
     */
    getErrorPosition(field) {
        const item = this.getItem(field)
        const positionDom = item.querySelector(
            `[${FormValidator.OppointNames.ErrorShowPosition}]`
        )
        return positionDom
    }

    // -------------------表单验证-------------------------
    /**
     * 验证整个表单，所配置的所有表单域。
     */
    doValidatorForm() {
        const fields = Object.keys(this.options.validators)
        const results = []

        let count = 0
        fields.forEach((item, index) => {
            results.push(this.doValidatorItem(item))
            if (results[index].isPass) {
                count++
            }
        })

        return {
            formPass: count === fields.length ? true : false,
            results
        }
    }
    /**
     *  对一个表单域，进行验证。
     * @param {*} field 表单域名
     * return {data:xxx,field: xxx, rule:xxx, results}
     */
    doValidatorItem(field) {
        const itemData = this.getItemData(field)
        const formData = this.getFormData()
        const rules = this.options.validators[field]
        // 循环不同的规则
        for (let i = 0; i < rules.length; i++) {
            const result = this.doValidatorValue(
                itemData[field],
                rules[i],
                formData
            )
            if (!result) {
                // 设置验证域，内部没有验证对象的情形。视为通过。
                return {
                    field,
                    isPass: true // 整体为true，个体也为true
                }
            }
            let msg
            const resultFilter = result.filter(item => {
                if (item !== true) {
                    msg = item
                    return item
                }
            })
            if (resultFilter.length !== 0) {
                // 有一项不通过的，直接返回。
                return {
                    data: itemData[field],
                    field,
                    msg,
                    rule: rules[i].rule,
                    isPass: false,
                    result
                }
            }
        }
        return {
            field,
            isPass: true // 整体为true，个体也为true
        }
    }

    /**
     *  对一个数据，及一个rule，验证结果
     * @param {null or Array} value 验证的数据
     * @param {*} rule 验证的规则
     * return result
     */
    doValidatorValue(value, rule, formData) {
        // values : null，数组。或则rule 不存在。
        if (value === null || !rule) {
            return
        }
        // 判断rule是什么类型的
        if (typeof rule.rule === 'string') {
            const StringRulesKey = Object.keys(FormValidator.OppointStringRules)
            if (StringRulesKey.includes(rule.rule)) {
                return FormValidator.OppointStringRules[rule.rule](
                    value,
                    rule.message,
                    formData
                )
            }
            throw new Error('rule ' + rule.rule + ' is not exist')
        } else if (rule.rule instanceof RegExp) {
            // 一般针对，一个验证项的.或则多个非多选框的形式。
            const result = value.map(item => {
                if (rule.rule.test(item)) {
                    return true
                } else {
                    return rule.message
                }
            })
            return result
        } else if (typeof rule.rule === 'function') {
            const result = value.map(item => {
                return rule.rule(item, formData)
            })
            return result
        }

        throw new Error(rule.rule + ' is not exist')
    }

    //-----------------获取数据------------------------
    /**
     * 获取一个表单域，所有的验证元素的，指定值，默认是value值。
     * 说明：一般，多选框只判断选中的。多个数据，一般就是多选的情况。平常都是建立多个field域，内部一个验证item
     * @param {*} field ItemName
     * return {field: [xxx]}
     */
    getItemData(field) {
        // 降低外界参数的偶合度。
        const validatorItems = this.getValidatorItems(field)
        const itemData = {}
        if (validatorItems.length === 0) {
            itemData[field] = null
            return itemData
        }
        itemData[field] = []
        // 判断验证属性：data-field-attr是否存在，不存在取默认value 三位运算符。
        const ValidatorAttr = FormValidator.OppointNames.ValidatorAttr
        const ValidatorAttrDefault =
            FormValidator.OppointNames.ValidatorAttrDefault
        validatorItems.forEach(item => {
            const attr =
                item.getAttributeNames().indexOf(ValidatorAttr) > -1
                    ? item.getAttribute(ValidatorAttr)
                    : ValidatorAttrDefault

            // item 为radio checkbox
            if (item.getAttributeNames().indexOf('checkbox') > -1) {
                if (item.getAttribute(attr)) {
                    itemData[field].push(item[attr])
                }
            } else {
                itemData[field].push(item[attr])
            }
        })
        return itemData
    }

    /**
     * 获取form内，所有field的数据。
     */
    getFormData() {
        const items = this.getAllItems()
        const fields = Object.keys(items)
        let formData = {}
        if (fields.length === 0) {
            return formData
        }
        fields.forEach(field => {
            const itemData = this.getItemData(field)
            // formData[field] = itemData[field]
            formData = { ...formData, ...itemData }
        })
        return formData
    }

    // ---------------------工具方法---------------------
    /**
     *获取FormItem表单项元素
     * @param {*} field 表单域name
     * return itemDom
     */
    getItem(field) {
        if (this.options.el === null) {
            throw new Error('Form Element is not exist')
        }
        const formDom = this.options.el
        const itemDom = formDom.querySelector(
            `[${FormValidator.OppointNames.FormItemContainer}=${field}]`
        )
        return itemDom
    }

    /**
     * 根据验证项，获取All Items
     * return {field：itemDom}
     */
    getAllItems() {
        // const fields = Object.keys(this.options.validators)

        const formDom = this.options.el
        const itemDoms = formDom.querySelectorAll(
            `[${FormValidator.OppointNames.FormItemContainer}]`
        )
        const items = {}
        itemDoms.forEach(item => {
            const fieldName = item.getAttribute(
                FormValidator.OppointNames.FormItemContainer
            )
            items[fieldName] = item
        })

        return items
    }

    /**
     *  获取一个item，下面的所有validatorDoms
     * @param {*} field itemName
     */
    getValidatorItems(field) {
        const itemDom = this.getItem(field)
        if (!itemDom) {
            throw new Error(`${field} formItem is not exist `)
        }
        const validatorItems = itemDom.querySelectorAll(
            `[${FormValidator.OppointNames.FormValidatorSelector}]`
        )
        return Array.from(validatorItems)
    }
}
