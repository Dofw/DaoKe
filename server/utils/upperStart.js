module.exports = function upper(value) {
    //将语句转化为首字母大写的办法.

    var result = []
    value = value.split(' ')
    for (var i = 0; i < value.length; i++) {
        var tool = ''
        var tools = value[i].toUpperCase()
        tool += tools[0]
        tools = tools.toLowerCase()
        for (var j = 1; j < tools.length; j++) {
            tool += tools[j]
        }
        result.push(tool)
    }
    result = result.join(' ')
    return result
}
