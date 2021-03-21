<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <Shopinfo :item="item" v-show="item.imgUrl" />
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import Shopinfo from "../../components/Shopinfo";

// 封装获取附近店铺方法
const nearbyListEffect = () => {
  // 附件店铺数据
  const nearbyList = ref([]);
  const getnearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    // console.log(result.data);
    if (result?.errno === 0 && result?.data?.length > 0) {
      nearbyList.value = result.data;
    }
  };
  // getnearbyList();
  return { nearbyList, getnearbyList };
};

export default {
  name: "Nearby",
  components: { Shopinfo },
  setup() {
    const { nearbyList, getnearbyList } = nearbyListEffect();
    // 调用获取数据的方法
    getnearbyList();
    return { nearbyList, getnearbyList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
