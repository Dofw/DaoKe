import { onMounted } from 'vue'
import FormValidator from '../../utils/FormValidator.js'

export default function useValidatorInstance(instance) {
    onMounted(() => {
        /**
         * 创建，验证实例
         * 提供方法1： setStatus() 说明：无参，设置整个表单的状态，有参数格式 field，field...
         * 提供方法2： getFormData() 无参
         * 提供方法3： doValidatorForm() 无参 整个表单的验证结果
         */
        instance.value = new FormValidator({
            el: document.querySelector('#regist-form'),
            errorClass: 'error-msg',
            containerClass: 'active', //正确，展示效果。
            validators: {
                username: [
                    {
                        rule: 'required',
                        message: '不能为空'
                    },
                    {
                        rule: /[\d\w]{3,9}/,
                        message: '账号格式：6-9位数字或者小写字母'
                    }
                ],
                createpwd: [
                    {
                        rule: 'required',
                        message: '不能为空'
                    },
                    {
                        rule: /[\d\w]{3,9}/,
                        message: '账号格式：6-9位数字或者小写字母'
                    },
                    {
                        rule: function(value, formData) {
                            if (value === formData.affirmpwd[0]) {
                                return true
                            }
                            return '两次密码不正确'
                        }
                    }
                ],
                affirmpwd: [
                    {
                        rule: 'required',
                        message: '不能为空'
                    },
                    {
                        rule: /[\d\w]{3,9}/,
                        message: '账号格式：6-9位数字或者小写字母'
                    },
                    {
                        rule: function(value, formData) {
                            if (value === formData.affirmpwd[0]) {
                                return true
                            }
                            return '两次密码不正确'
                        }
                    }
                ]
            }
        })
    })
}
