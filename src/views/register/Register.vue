<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt="用户头像"
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="username"
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
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请再次输入密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLogin">立即登录</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";

export default {
  name: "Register",
  // 使用子组件
  components: { Toast },

  setup() {
    const router = useRouter();
    const { show, toastMessage, showToast } = useToastEffect();

    const data = reactive({
      username: "",
      password: "",
      ensurement: "",
    });
    // 注册接口
    const handleRegister = async () => {
      try {
        const result = await post("/api/user/register", {
          username: data.username,
          password: data.password,
        });
        if (result?.errno === 0) {
          router.push({ name: "Login" });
        } else {
          showToast("注册失败!");
        }
      } catch (e) {
        showToast("注册请求失败!!");
      }
    };
    // 跳转到的登录
    const handleLogin = () => {
      router.push({ name: "Login" });
    };
    const torefsData = toRefs(data);
    return {
      handleLogin,
      handleRegister,
      show,
      toastMessage,
      showToast,
      ...torefsData,
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
  &__register-button {
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
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
