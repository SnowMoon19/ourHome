import { createStore } from 'vuex'
import {setToken, setUserId, setUserName} from "@/myConfig/auth";
import {login} from "@/api/user";

export default createStore({
  state: {
    userId: null,
    userName: null,
    token: null,
  },
  getters: {
    token: state => state.token,
    userId: state => state.userId,
    userName: state => state.userName,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName;
    },
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('username', userInfo.username);
        formData.append('password', userInfo.password);
        login(formData).then(res => {
          //登录成功的操作
          //设置cookie中的token
          setToken(res.data.token);
          // 设置用户信息
          setUserId(res.data.user.userId);
          setUserName(res.data.user.userName);
          //触发vuex中的SET_TOKEN方法，设置vuex仓库中的token
          commit('SET_TOKEN', res.data.token);
          commit('SET_USER_ID', res.data.user.userId);
          commit('SET_USER_NAME', res.data.user.userName);
          resolve(res)
        }).catch(error => {
          //登录失败的操作
          reject(error)
        })
      })
    },
  },
  modules: {
  }
})
