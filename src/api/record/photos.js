import request from "@/myConfig/request";

/**
 * 查询当前用户的相册列表
 */
export function getAlbumList(formData) {
    return request({
        url: `/record/photos/getAlbumListById`,
        method: 'post',
        data: formData,
    })
}

/**
 * 新增一个相册
 */
export function addAlbum(bodyData) {
    return request({
        url: `/record/photos/addAlbum`,
        method: 'post',
        data: bodyData,
    })
}

/**
 * 通过albumId获取全部照片
 */
export function getPhotoList(formData) {
    return request({
        url: `/record/photos/getPhotoList`,
        method: 'post',
        data: formData,
    })
}

/**
 * 上传照片
 */
export function uploadPhotoList(formData) {
    return request({
        url: `/record/photos/uploadPhotoList`,
        method: 'post',
        data: formData,
    })
}