import request from '@/myConfig/request'

/**
 * 查询当前用户的第一次记录列表
 */
export function getFirstRecordList(formData) {
    return request({
        url: `/record/firstRecord/getFirstRecordListById`,
        method: 'post',
        data: formData,
    })
}

/**
 * 新增一条第一次记录
 */
export function addFirstRecord(bodyData) {
    return request({
        url: `/record/firstRecord/addFirstRecord`,
        method: 'post',
        data: bodyData,
    })
}

/**
 * 确认一条待完成第一次记录
 */
export function confirmTodoFirstRecord(bodyData) {
    return request({
        url: `/record/firstRecord/confirmTodoFirstRecord`,
        method: 'post',
        data: bodyData,
    })
}

/**
 * 删除一条待完成的第一次记录
 */
export function deleteTodoFirstRecord(formData) {
    return request({
        url: `/record/deleteTodoFirstRecord`,
        method: 'post',
        param: formData,
    })
}