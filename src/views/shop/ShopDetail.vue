<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBack">&#xe65e;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe71a;</span>
        <input
          type="text"
          class="search__content__input"
          placeholder="请输入商品名称"
        />
      </div>
    </div>
    <Shopinfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import Shopinfo from "../../components/Shopinfo.vue";
import Content from "./Content.vue";
import { get } from "../../utils/request";

const useGetShopDetailEffect = () => {
  const data = reactive({ item: {} });
  // 获取商品详情数据
  const getShopDeatail = async () => {
    // 获取当前路由中传递的参数
    const route = useRoute();
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { getShopDeatail, item };
};

export default {
  name: "ShopDetail",
  components: { Shopinfo, Content },
  setup() {
    const { getShopDeatail, item } = useGetShopDetailEffect();
    getShopDeatail();
    // console.log("item", item);
    // 返回上一页
    const router = useRouter();
    const handleBack = () => {
      router.back();
    };
    return { item, handleBack };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
