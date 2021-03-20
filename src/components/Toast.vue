<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  name: "Toast",
  props: ["message"],
};
// 封装toast相关操作
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: "",
  });
  const showToast = (message) => {
    (toastData.show = true), (toastData.toastMessage = message);
    setTimeout(() => {
      (toastData.show = false), (toastData.toastMessage = "");
    }, 3000);
  };
  const { show, toastMessage } = toRefs(toastData);
  return { show, toastMessage, showToast };
};
</script>
<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>
