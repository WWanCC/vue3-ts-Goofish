<template>
  <main>
    <!-- 【修改】错误信息单独显示，不再和 loading、列表互斥 -->
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}：¥{{ product.price }}
      </li>
    </ul>

    <button v-if="hasMore" :disabled="loading" @click="loadProducts">
      {{ loading ? "正在加载商品……" : "加载更多" }}
    </button>
     <!-- 【新增】加载结束后显示提示 -->
    <p v-else-if="products.length > 0">
      没有更多商品了
    </p>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { getHomeProducts } from "@/modules/home/api/home.api";
import type { ProductItem } from "@/modules/home/types";

const products = ref<ProductItem[]>([]);
const loading = ref(false);
const errorMessage = ref("");

const cursor = ref<number | null>(null);
const hasMore = ref(true);

async function loadProducts() {
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

    //追加新商品
    products.value.push(...response.data.list);
    cursor.value = response.data.nextCursor;
    hasMore.value = response.data.hasMore;
  } catch (error) {
    console.error(error);
    errorMessage.value = "商品加载失败";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadProducts();
});
</script>
