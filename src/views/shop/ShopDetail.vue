<template>
  <div class="wrapper">
    <Shopinfo :item="item" :hideBorder="true" />
  </div>
</template>

<script>
import Shopinfo from "../../components/Shopinfo.vue";

export default {
  name: "ShopDetail",
  components: { Shopinfo },
  setup() {
    const item = {
      _id: "1",
      name: "沃尔玛",
      imgUrl: "http://www.dell-lee.com/imgs/vue3/near.png",
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      slogan: "马甲",
    };
    return { item };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 0 0.18rem;
}
</style>
