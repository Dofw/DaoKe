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

export default class myFormData {
    // 一些约定：实现高可维护，高拓展。
    static OppointNames = {
        FormItemContainer: 'data-field-container', // 约定，表单项容器
        FormDataSelector: 'data-field', // 约定，表单验证元素
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

    constructor(form) {
        this.el = form || null
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
        const ValidatorAttr = myFormData.OppointNames.ValidatorAttr
        const ValidatorAttrDefault =
            myFormData.OppointNames.ValidatorAttrDefault
        validatorItems.forEach(item => {
            const attr =
                item.getAttributeNames().indexOf(ValidatorAttr) > -1
                    ? item.getAttribute(ValidatorAttr)
                    : ValidatorAttrDefault

            // item 为radio checkbox
            if (item.type === 'checkbox') {
                if (item.attr) {
                    //收集为true
                    itemData[field].push(item['value'])
                }
            } else if (item.type === 'radio') {
                if (item[attr]) {
                    //收集为true
                    itemData[field].push(item['value'])
                }
            } else {
                itemData[field].push(item[attr])
            }
        })
        if (itemData[field].length === 1) {
            itemData[field] = itemData[field][0]
        }

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
        if (this.el === null) {
            throw new Error('Form Element is not exist')
        }
        const formDom = this.el
        const itemDom = formDom.querySelector(
            `[${myFormData.OppointNames.FormItemContainer}=${field}]`
        )
        return itemDom
    }

    /**
     * 根据验证项，获取All Items
     * return {field：itemDom}
     */
    getAllItems() {
        // const fields = Object.keys(validators)

        const formDom = this.el
        const itemDoms = formDom.querySelectorAll(
            `[${myFormData.OppointNames.FormItemContainer}]`
        )
        const items = {}
        itemDoms.forEach(item => {
            const fieldName = item.getAttribute(
                myFormData.OppointNames.FormItemContainer
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
            `[${myFormData.OppointNames.FormDataSelector}]`
        )
        return Array.from(validatorItems)
    }
}
