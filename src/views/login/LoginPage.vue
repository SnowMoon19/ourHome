<template>
  <div class="login-container">
    <el-card class="card">
<!--      <div class="logo"> &lt;!&ndash;图标&ndash;&gt;-->
<!--        <img src="../../assets/firstRecordList.png" alt="logo" width="25px">-->
<!--      </div>-->
      <h3 class="title">Login</h3>

      <van-form @submit="onSubmit" >
          <van-field
              style="border-top-left-radius: 2.5vw; border-top-right-radius: 2.5vw"
              v-model="loginForm.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              style="border-bottom-left-radius: 2.5vw; border-bottom-right-radius: 2.5vw"
              v-model="loginForm.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
        <div>
          <van-button block native-type="submit" @click="login" style="border-radius: 2.5vw;margin-top: 2vh;background: #b9caf7; color: white">
            登 录
          </van-button>
        </div>
      </van-form>
    </el-card>
  </div>
</template>

<script>

// import {isvalidUsername} from "@/utils/validate";
import {Toast} from "vant";

export default {
  name: "LoginPage",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePass }]
      // },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      errorMsg: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    login() {
      // 调用登录的接口
      this.$store.dispatch('Login', this.loginForm).then(
          (res) => {
            // 跳转到home
            console.log('login success: ', res)
            this.$router.push('/home');
          }
      ).catch(err => {
        Toast.fail('账号或密码错误')
        console.log('err', err)
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  padding-top: 5vh;
}

.title {
  font-size: 10vw;
  color: black;
  margin-top: 8vh;
  text-align: center;
  font-weight: bolder;
}

.card {
  height: 70vh;
  width: 80vw;
  margin: auto;
  background: #ffecec;
  border-radius: 4%;
  border: 10px black solid;
  border-inline-width: 4px;
  border-top-width: 4px;
  border-bottom-width: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 10);
  transition: all .3s ease-in;
}


.input-card {
  background: #a0e6e3;
  border-radius: 5px;    /*输入框圆角值*/
  border: black 5px;
  width: 70vw;
  height: 40vh;
}



.logo {
  margin: 30px auto;
  width: 250px;
}
</style>
