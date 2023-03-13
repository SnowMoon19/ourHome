import {Toast} from "vant";

// 出错提示
export function errorDealt(err) {
    if (err === 'loginErr') Toast('请重新登录');
    else Toast.fail('出错了');
}