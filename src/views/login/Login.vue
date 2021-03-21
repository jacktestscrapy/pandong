<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt="用户头像"
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
    <div class="wrapper__login-link">找回密码</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";

export default {
  name: "Login",
  components: { Toast },
  setup() {
    const router = useRouter();
    const { show, toastMessage, showToast } = useToastEffect();
    // 用户名和密码
    const data = reactive({
      username: " ",
      password: " ",
    });

    // 登录处理
    const handleLogin = async () => {
      //请求登录接口,调用封装的post接口
      try {
        const result = await post("/api/user/login", {
          username: data.username,
          password: data.password,
        });
        console.log("登录", result.errno);
        // 判断返回值
        if (result?.errno === 0) {
          localStorage.isLogin = true;
          // 跳转
          router.push({ name: "Home" });
        } else {
          showToast("登录失败");
          // alert("登录失败");
        }
      } catch (e) {
        showToast("登录请求失败");
      }
    };

    const handleRegister = () => {
      router.push({ name: "Register" });
    };
    const { username, password } = toRefs(data);
    return {
      handleLogin,
      handleRegister,
      show,
      toastMessage,
      password,
      username,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  left: 0;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: $content-notice-fontcolor;
    font-size: 0.16rem;
    text-align: center;
  }
  &__login-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
