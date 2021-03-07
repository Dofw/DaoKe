export default function useEditormoBindEvent(mp3UrlRef, pictureUrlRef) {
    // mood 事件函数
    const unfoldArea = e => {
        e.currentTarget.classList.add('active')
    }
    const shrinkArea = e => {
        e.currentTarget.classList.remove('active')
    }

    // 通过span标签点击事件，控制上传
    const mp3Span = () => {
        span2inputFile('#mp3', mp3UrlRef)
    }
    const pictureSpan = () => {
        span2inputFile('#picture', pictureUrlRef)
    }
    return {
        mp3Span,
        pictureSpan,
        unfoldArea,
        shrinkArea
    }
}

/**
 * 封装方法，获取dom，绑定change事件，触发dom的click事件 参数#name ,ref
 */
function span2inputFile(id, ref) {
    const fileName = id.split('#')[1]
    const dom = document.querySelector(id)
    dom.onchange = async e => {
        // 变化完成后，在获取 file文件，生成formData数据。
        const formData = new FormData()
        formData.append(fileName, dom.files[0])
        // 发送上传请求
        const res = await fetch(
            'http://localhost:3000/admin/upload/editormood',
            {
                method: 'post',
                body: formData
            }
        )
        // 解决每次都能触发，文件变化问题
        e.target.value = null

        let data = await res.text()
        data = JSON.parse(data)
        console.log(data)
        if (data.status !== 200) {
            alert(data.msg)
            return
        }
        ref.value = data.url
    }
    dom.click()
}
