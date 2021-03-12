## Vue3.X

[toc]

### 实例化的方式转变

    1. 从new Vue => 变成 createApp(App) 优势
       1. 实例方法的形式，保证了仅适用于该实例。避免了Vue.mixin()/ Vue.component()，对一个页面多个vue实例的影响。
       2. 将方法通过export的方式导出，有利于tree-shaking。提升性能。
       3. createApp().use().mixin().component() 等，链式编程调用。
       4. 应用和实例概念，区分开了。createApp()创建的应用，里面application中的方法（控制全局），不包含组件内其他的信息。

    ```js
        import {createApp} from 'vue' // App为组件
        createApp(App).mount('#app')

    ```

### v-model .sync 修饰符的变化

    1. 去掉了.sync, 统一使用v-model
    2. model配置被移除。
    3. 可以绑定多个数据。modelValue 默认 v-model，其他值 使用 v-model：title
    4. 增加了自定义修饰符。
    5. 使用方法, 改为.sync的格式。如下：

```js
    格式：
    默认modelValue
     <Children :modelValue='data' @updata:modelValue='data=$event'>展开</Children>
    <Children v-model='data'>简写</Children>
    其他值
     <Children :title='data' @updata:title='data=$event'>展开</Children>
    <Children v-model:title='data'>简写</Children>


    自定义修饰符：
     <Children v-model.cap='data' v-model:title.cap='data1'>展开</Children>
    加了修饰符之后，就给组件提供了对应的属性
    modelValue => **modelModifiers:{cap: true}**
    titel => **titleModifiers:{cap: true}**   根据提供的参数判断，自己写实现的功能。

    然后 props 中就含有有该属性了。
    props：{
        modelValue: Boolean,
        title: String,

        modelModifiers:{ vue2中props
            default: ()=> ({}) //提供一个默认值
        },
        titleModifiers
    }

```

### v-if 和 v-for

    1. v-if的优先级，大于v-for的优先级。这种逻辑才是正确的。
    2. key
       1. template中，不需要像2那样，给每个根节点添加key。3中，只需要在template中添加就ok
       2. v-if v-else-if v-else中，不需要添加key来解决之前的input内容保留到另外条件下的input中。vue3自动添加key，如果想保留数据，哪就绑定统一个数据。
    3. template，不强制增加根节点了

### 有关 es6 模块化 ，遇到的问题。

    1. 路由组件，中再次引入 router。此时 router 为undefined,
       1. 原因：router建立时他依赖组件，由于es6模块化所谓的依赖倒置，后依赖的先执行。同时，引入$http模块，其内部引入router也是同样的道理。
