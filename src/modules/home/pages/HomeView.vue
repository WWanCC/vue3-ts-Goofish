<template>
  <main>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}：¥{{ product.price }}
      </li>
    </ul>

    <p v-if="loading">正在加载商品……</p>
    <p v-else-if="!hasMore && products.length > 0">没有更多商品了</p>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { getHomeProducts } from "@/modules/home/api/home.api";
import type { ProductItem } from "@/modules/home/types";

import { useInfiniteScroll } from "@vueuse/core";

const products = ref<ProductItem[]>([]);
const loading = ref(false);
const errorMessage = ref("");

const cursor = ref<number | null>(null);
const hasMore = ref(true);

async function loadProducts() {
  // 正在请求或者没有下一页时，直接结束
  if (loading.value || !hasMore.value) {
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getHomeProducts({
      cursor: cursor.value ?? undefined,
      limit: 3,
    });

    //把新一页追加到旧商品后面
    products.value.push(...response.data.list);
    //保存下一页游标
    cursor.value = response.data.nextCursor;
    //保存是否还有下一页
    hasMore.value = response.data.hasMore;
  } catch (error) {
    console.error(error);
    errorMessage.value = "商品加载失败";
  } finally {
    loading.value = false;
  }
}

useInfiniteScroll(
  window,

  // 接近页面底部时调用现有加载函数
  () => {
    return loadProducts();
  },

  {
    // 距离页面底部还有 200px 时提前加载
    distance: 200,

    // 只有满足条件时才允许继续触发
    canLoadMore: () => {
      return hasMore.value && !loading.value;
    },
  },
);

onMounted(() => {
  loadProducts();
});
</script>
