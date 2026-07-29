<template>
  <div class="min-h-screen bg-[#f5f5f5] px-3 py-4 sm:px-5 lg:px-8">
    <!-- 首页白色主体 -->
    <main
      class="mx-auto max-w-[1480px] rounded-[20px] bg-white px-3 py-5 sm:px-5 lg:px-6"
    >
      <h1 class="sr-only">闲鱼商品推荐</h1>

      <!-- 顶部分类栏 -->
      <nav
        aria-label="商品分类"
        class="mb-6 flex gap-2.5 overflow-x-auto pb-1"
      >
        <button
          v-for="(category, index) in categories"
          :key="category"
          type="button"
          class="shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors"
          :class="
            index === 0
              ? 'bg-[#ffe500] font-semibold text-[#222]'
              : 'bg-[#f6f6f6] text-[#444] hover:bg-[#eeeeee]'
          "
        >
          {{ category }}
        </button>
      </nav>

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
        v-if="
          !loading &&
          !errorMessage &&
          !hasMore &&
          products.length === 0
        "
        class="flex min-h-64 items-center justify-center"
      >
        <p class="text-sm text-[#999]">
          暂无商品
        </p>
      </section>

      <!-- 商品列表 -->
      <section
        v-if="products.length > 0"
        class="-mx-1.5 flex flex-wrap sm:-mx-2"
      >
        <!-- 商品布局项 -->
        <div
          v-for="product in products"
          :key="product.id"
          class="w-1/2 px-1.5 pb-7 sm:w-1/3 sm:px-2 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
        >
          <!-- 商品卡片 -->
          <article
            class="group h-full min-w-0 cursor-pointer rounded-[14px] p-1 transition-colors hover:bg-[#fafafa]"
          >
            <!-- 商品图片 -->
            <div
              class="aspect-square overflow-hidden rounded-[14px] bg-[#f2f3f5]"
            >
              <img
                :src="product.imageUrl"
                :alt="product.title"
                loading="lazy"
                draggable="false"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <!-- 商品标题 -->
            <h2
              :title="product.title"
              class="mt-2.5 min-h-[44px] line-clamp-2 text-[15px] leading-[22px] font-normal text-[#222] -mb-1.5"
            >
              <span
                v-if="product.shippingIncluded"
                class="mr-1 rounded-sm bg-[#ffe500] px-1 py-0.5 text-xs font-semibold text-[#222]"
              >
                包邮
              </span>

              {{ product.title }}
            </h2>

            <!-- 服务标签 -->
            <div
              v-if="product.serviceTag"
              class="mt-1.5"
            >
              <span
                class="rounded border border-[#ff9a73] px-1 py-0.5 text-xs text-[#ff5a26]"
              >
                {{ product.serviceTag }}
              </span>
            </div>

            <!-- 商品属性 -->
            <p
              v-if="product.attributeText"
              :title="product.attributeText"
              class="mt-1.5 truncate text-xs text-[#999]"
            >
              {{ product.attributeText }}
            </p>

            <!-- 商品地区 -->
            <div
              class="mt-1.5 flex min-w-0 items-center gap-1 text-xs text-[#999]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                class="size-3.5 shrink-0"
              >
                <path
                  d="M12 21C12 21 19 16.6 19 10.5C19 6.36 15.87 3 12 3C8.13 3 5 6.36 5 10.5C5 16.6 12 21 12 21Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.3"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>

              <span class="truncate">
                {{ product.location }}
              </span>
            </div>

            <!-- 商品价格 -->
            <div class="mt-2 flex min-w-0 items-baseline gap-1.5">
              <p class="shrink-0 text-[#ff4f24]">
                <span class="text-sm font-semibold">
                  ¥
                </span>

                <span class="text-[22px] leading-none font-bold">
                  {{ product.price }}
                </span>
              </p>

              <!-- 想要人数 -->
              <span class="shrink-0 text-xs text-[#999]">
                {{ product.wantedCount }}人想要
              </span>

              <!-- 原价可能不存在 -->
              <del
                v-if="product.originalPrice"
                class="min-w-0 truncate text-xs text-[#aaa]"
              >
                ¥{{ product.originalPrice }}
              </del>
            </div>

            <!-- 卖家信息 -->
            <div class="mt-2 flex min-w-0 items-center gap-1.5">
              <img
                :src="product.sellerAvatarUrl"
                :alt="product.sellerName"
                loading="lazy"
                class="size-5 shrink-0 rounded-full bg-[#f2f3f5] object-cover"
              />

              <span
                :title="product.sellerName"
                class="min-w-0 truncate text-xs text-[#777]"
              >
                {{ product.sellerName }}
              </span>

              <!-- 信用标签可能不存在 -->
              <span
                v-if="product.sellerCredit"
                class="ml-auto shrink-0 rounded-full bg-[#fff1e8] px-2 py-0.5 text-xs text-[#ff6b2c]"
              >
                {{ product.sellerCredit }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <!-- 加载状态 -->
      <div
        v-if="loading"
        class="flex items-center justify-center gap-2 py-8 text-sm text-[#999]"
      >
        <span
          class="size-4 animate-spin rounded-full border-2 border-[#ddd] border-t-[#ffe000]"
        ></span>

        <span>正在加载更多商品</span>
      </div>

      <!-- 已加载全部商品 -->
      <p
        v-else-if="!hasMore && products.length > 0"
        class="py-8 text-center text-sm text-[#aaa]"
      >
        没有更多商品了
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'

import { getHomeProducts } from '@/modules/home/api/home.api'
import type { ProductItem } from '@/modules/home/types'

/**
 * 顶部分类目前只用于还原原型样式，
 * 暂时不执行真正的商品筛选。
 */
const categories = [
  '猜你喜欢',
  '个人闲置',
  'BJD娃娃',
  '垂钓',
  '吉他乐器',
  '台球',
  '摄影摄像',
  '钱币收藏',
  '女装穿搭',
  '居家好物',
  '大牌美妆',
  '机车',
] as const

/**
 * 已经加载的全部商品。
 */
const products = ref<ProductItem[]>([])

/**
 * 请求状态。
 */
const loading = ref(false)

/**
 * 请求错误提示。
 */
const errorMessage = ref('')

/**
 * 下一页游标。
 *
 * null 表示当前还没有游标，
 * 即准备请求第一页。
 */
const cursor = ref<number | null>(null)

/**
 * 后端是否还有下一页。
 */
const hasMore = ref(true)

/**
 * 请求一页商品。
 */
async function loadProducts() {
  // 正在请求时，避免重复请求。
  // 没有下一页时，停止继续请求。
  if (loading.value || !hasMore.value) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await getHomeProducts({
      cursor: cursor.value ?? undefined,

      // PC 最宽时一行 6 张卡片，
      // 一次请求 12 条，相当于两行。
      limit: 12,
    })

    // 将新请求到的一页商品追加到原数组末尾。
    products.value.push(...response.data.list)

    // 保存下一页游标。
    cursor.value = response.data.nextCursor

    // 保存是否还有下一页。
    hasMore.value = response.data.hasMore
  } catch (error) {
    console.error(error)

    errorMessage.value = '商品加载失败，请稍后重试'
  } finally {
    loading.value = false
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
    return hasMore.value && !loading.value
  },
})

/**
 * 页面第一次挂载时，
 * 主动请求第一页。
 */
onMounted(() => {
  loadProducts()
})
</script>
