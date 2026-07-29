<template>
  <div class="min-h-screen bg-[#f5f5f5] px-3 py-4 sm:px-5 lg:px-8">
    <!-- 首页白色主体 -->
    <main class="mx-auto max-w-[1480px] rounded-[20px] bg-white px-3 py-5 sm:px-5 lg:px-6">
      <h1 class="sr-only">闲鱼商品推荐</h1>

      <div class="feed-tabs mb-6 overflow-x-auto pb-1">
        <el-segmented v-model="activeCategory" :options="categories" class="feed-segmented -ml-3" />
      </div>

      <!-- 请求错误 -->
      <section
        v-if="errorMessage"
        class="mb-5 flex items-center justify-between gap-4 rounded-xl bg-red-50 px-4 py-3"
      >
        <p class="text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <button
          type="button"
          class="shrink-0 rounded-lg bg-white px-3 py-1.5 text-sm text-red-600 shadow-sm transition-colors hover:bg-red-100"
          @click="loadProducts"
        >
          重新加载
        </button>
      </section>

      <!-- 空商品状态 -->
      <section
        v-if="!loading && !errorMessage && !hasMore && products.length === 0"
        class="flex min-h-64 items-center justify-center"
      >
        <p class="text-sm text-[#999]">暂无商品</p>
      </section>

      <!-- 商品列表 -->
      <section v-if="products.length > 0" class="-mx-1.5 flex flex-wrap sm:-mx-2">
        <!-- 商品布局项 -->
        <div
          v-for="product in products"
          :key="product.id"
          class="w-1/2 px-1.5 pb-7 sm:w-1/3 sm:px-2 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
        >
          <!-- 商品卡片 -->
          <ProductCard :product="product"></ProductCard>
        </div>
      </section>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center gap-2 py-8 text-sm text-[#999]">
        <span
          class="size-4 animate-spin rounded-full border-2 border-[#ddd] border-t-[#ffe000]"
        ></span>

        <span>正在加载更多商品</span>
      </div>

      <!-- 已加载全部商品 -->
      <p v-else-if="!hasMore && products.length > 0" class="py-8 text-center text-sm text-[#aaa]">
        没有更多商品了
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useInfiniteScroll } from "@vueuse/core";

import { getHomeProducts } from "@/modules/home/api/home.api";
import type { ProductItem } from "@/modules/home/types";
import ProductCard from "../components/ProductCard.vue";

/**
 * 顶部分类目前只用于还原原型样式，
 * 暂时不执行真正的商品筛选。
 */
const categories = [
  "猜你喜欢",
  "个人闲置",
  "BJD娃娃",
  "垂钓",
  "吉他乐器",
  "台球",
  "摄影摄像",
  "钱币收藏",
  "女装穿搭",
  "居家好物",
  "大牌美妆",
  "机车",
] as const;

const activeCategory = ref<string>(categories[0]);

/**
 * 已经加载的全部商品。
 */
const products = ref<ProductItem[]>([]);

/**
 * 请求状态。
 */
const loading = ref(false);

/**
 * 请求错误提示。
 */
const errorMessage = ref("");

/**
 * 下一页游标。
 *
 * null 表示当前还没有游标，
 * 即准备请求第一页。
 */
const cursor = ref<number | null>(null);

/**
 * 后端是否还有下一页。
 */
const hasMore = ref(true);

/**
 * 请求一页商品。
 */
async function loadProducts() {
  // 正在请求时，避免重复请求。
  // 没有下一页时，停止继续请求。
  if (loading.value || !hasMore.value) {
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await getHomeProducts({
      cursor: cursor.value ?? undefined,

      // PC 最宽时一行 6 张卡片，
      // 一次请求 12 条，相当于两行。
      limit: 12,
    });

    // 将新请求到的一页商品追加到原数组末尾。
    products.value.push(...response.data.list);

    // 保存下一页游标。
    cursor.value = response.data.nextCursor;

    // 保存是否还有下一页。
    hasMore.value = response.data.hasMore;
  } catch (error) {
    console.error(error);

    errorMessage.value = "商品加载失败，请稍后重试";
  } finally {
    loading.value = false;
  }
}

/**
 * 监听整个页面滚动。
 *
 * 距离页面底部还有 200px 时，
 * 调用 loadProducts 加载下一页。
 */
useInfiniteScroll(window, loadProducts, {
  distance: 200,

  canLoadMore: () => {
    return hasMore.value && !loading.value;
  },
});

/**
 * 页面第一次挂载时，
 * 主动请求第一页。
 */
onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.feed-segmented {
  --el-segmented-bg-color: transparent;
  --el-segmented-padding: 0;
  --el-segmented-item-selected-bg-color: #ffe500;
  --el-segmented-item-selected-color: #222;
  --el-border-radius-base: 16px;
}

.feed-segmented :deep(.el-segmented__group) {
  gap: 10px;
  min-height: 36px;
  padding: 0 16px;
  border-radius: 9999px;
  white-space: nowrap;
}

.feed-segmented:deep(.el-segmented__item:not(.is-selected):hover) {
  background-color: #ffe60f;
}

.feed-segmented :deep(.el-segmented__item.is-selected) {
  font-weight: bold;
}

.feed-segmented :deep(.el-segmented__item:not(.is-selected)) {
  background-color: #f5f5f5;
}

</style>
