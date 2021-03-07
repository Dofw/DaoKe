import { reactive, readonly } from 'vue'
export default function useListConstructor() {
    const listData = reactive([
        {
            category: 'editor',
            logo: 'icon-bianji1',
            children: []
        },
        {
            category: 'music',
            logo: 'icon-yinleyule',
            children: [
                {
                    subclass: 'All',
                    logo: 'icon-yinle'
                },
                {
                    subclass: 'Love-songs',
                    logo: 'icon-yinle'
                },
                {
                    subclass: 'Quiet-songs',
                    logo: 'icon-yinle'
                }
            ]
        },
        {
            category: 'chat',
            logo: 'icon-liaotianqingqiu',
            children: [
                {
                    subclass: 'single',
                    logo: 'icon-pinglun'
                },
                {
                    subclass: 'multiplayer',
                    logo: 'icon-ziyuan'
                },
                {
                    subclass: 'create',
                    logo: 'icon-faqiliaotian'
                }
            ]
        }
    ])
    const list = readonly(listData) // html生成结构需要使用的数据。

    const changeListActive = el => {
        if (
            el.currentTarget.parentNode
                .getAttribute('class')
                .indexOf('active') > -1
        ) {
            el.currentTarget.parentNode.classList.remove('active')
        } else {
            el.currentTarget.parentNode.classList.add('active')
        }
    }

    return {
        list,
        changeListActive
    }
}
