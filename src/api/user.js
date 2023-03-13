import request from "@/myConfig/request";

/**
 * 用户登录
 */
export function login(formData) {
    return request({
        url: `/user/login`,
        method: 'post',
        data: formData
    })
}