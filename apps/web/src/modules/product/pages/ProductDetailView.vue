<template>
  <!-- 整个详情页背景 -->
  <div class="min-h-screen bg-[#f5f6f7] px-4 py-6">

    <main class="mx-auto max-w-[1200px]">

      <!-- ============================= -->
      <!-- 加载状态 -->
      <!-- ============================= -->
      <p
        v-if="loading"
        class="rounded-2xl bg-white p-6 text-[#999]"
      >
        正在加载商品...
      </p>


      <!-- ============================= -->
      <!-- 错误状态 -->
      <!-- ============================= -->
      <p
        v-if="errorMessage"
        class="rounded-2xl bg-white p-6 text-red-500"
      >
        {{ errorMessage }}
      </p>


      <!-- ============================= -->
      <!-- 商品加载成功 -->
      <!-- ============================= -->
      <template v-if="product">

        <!-- ============================= -->
        <!-- 卖家信息横条 -->
        <!-- ============================= -->
        <section
          class="flex items-center gap-3 rounded-2xl bg-white px-5 py-4"
        >
          <!-- 卖家头像 -->
          <img
            :src="product.seller.avatarUrl"
            :alt="product.seller.nickname"
            class="size-11 shrink-0 rounded-full object-cover"
          />

          <!-- 卖家文字信息 -->
          <div class="min-w-0">

            <div class="flex items-center gap-2">

              <!-- 卖家昵称 -->
              <span class="truncate font-medium text-[#222]">
                {{ product.seller.nickname  }}
              </span>

              <!-- 卖家信用标签 -->
              <span
                v-if="product.seller.credit"
                class="shrink-0 rounded bg-[#fff2b2] px-2 py-0.5 text-xs text-[#7a6500]"
              >
                {{ product.seller.credit }}
              </span>

            </div>

            <!-- 卖家地区 -->
            <p class="mt-1 text-xs text-[#999]">
              {{ product.location }}
            </p>

          </div>
        </section>


        <!-- ============================= -->
        <!-- 商品详情主体 -->
        <!-- ============================= -->
        <section
          class="mt-4 grid gap-8 rounded-2xl bg-white p-5 md:grid-cols-2"
        >

          <!-- ============================= -->
          <!-- 左侧：商品多图 -->
          <!-- ============================= -->
          <div class="flex gap-3">

            <!-- 缩略图列表 -->
            <div class="flex shrink-0 flex-col gap-3">

              <button
                v-for="image in product.images"
                :key="image.id"
                type="button"
                class="size-20 overflow-hidden rounded-lg border-2 bg-[#f5f5f5]"
                :class="
                  activeImageUrl === image.url
                    ? 'border-[#ffe500]'
                    : 'border-transparent'
                "
                @click="activeImageUrl = image.url"
              >
                <img
                  :src="image.url"
                  :alt="product.title"
                  class="size-full object-cover"
                />
              </button>

            </div>


            <!-- 当前主图 -->
            <div
              class="flex min-h-[500px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#f5f5f5]"
            >
              <img
                :src="activeImageUrl"
                :alt="product.title"
                class="max-h-[620px] max-w-full object-contain"
              />
            </div>

          </div>


          <!-- ============================= -->
          <!-- 右侧：商品信息 -->
          <!-- ============================= -->
          <div class="py-4">

            <!-- 价格 -->
            <div class="text-[#ff4f24]">

              <span class="text-lg font-semibold">
                ¥
              </span>

              <span class="text-4xl font-bold">
                {{ product.price }}
              </span>

              <!-- 原价 -->
              <del
                v-if="product.originalPrice"
                class="ml-3 text-sm font-normal text-[#aaa]"
              >
                ¥{{ product.originalPrice }}
              </del>

            </div>


            <!-- 包邮标签 -->
            <div
              v-if="product.shippingIncluded"
              class="mt-4"
            >
              <span
                class="rounded bg-[#ffe500] px-2 py-1 text-xs font-medium text-[#222]"
              >
                包邮
              </span>
            </div>


            <!-- 服务保障 -->
            <div
              v-if="product.serviceTag"
              class="mt-5 rounded-xl bg-[#f7f7f7] px-4 py-3"
            >
              <span class="text-sm font-medium text-[#333]">
                {{ product.serviceTag }}
              </span>
            </div>


            <!-- 商品标题 -->
            <h1
              class="mt-6 text-2xl leading-9 font-medium text-[#222]"
            >
              {{ product.title }}
            </h1>


            <!-- 商品属性 -->
            <p
              v-if="product.attributeText"
              class="mt-5 text-sm leading-7 text-[#666]"
            >
              {{ product.attributeText }}
            </p>


            <!-- 地区 + 想要人数 -->
            <div
              class="mt-6 flex items-center justify-between text-sm text-[#999]"
            >
              <span>
                发布地区：

                <span class="text-[#555]">
                  {{ product.location }}
                </span>
              </span>

              <span>
                {{ product.wantedCount }} 人想要
              </span>
            </div>


            <!-- 操作按钮 -->
            <div class="mt-10 flex gap-3">

              <button
                type="button"
                class="flex-1 rounded-full bg-[#ffe500] px-6 py-3 text-base font-medium text-[#222] transition hover:bg-[#f5d900]"
              >
                聊一聊
              </button>

              <button
                type="button"
                class="flex-1 rounded-full bg-[#333] px-6 py-3 text-base font-medium text-white transition hover:bg-[#222]"
              >
                立即购买
              </button>

              <button
                type="button"
                class="rounded-full bg-[#f5f5f5] px-6 py-3 text-base text-[#333] transition hover:bg-[#ebebeb]"
              >
                收藏
              </button>

            </div>

          </div>

        </section>

      </template>

    </main>

  </div>
</template>


<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import {
  getProductDetail,
  type ProductDetailResponse,
} from '@/modules/product/api/product.api.ts'


// =============================
// 获取当前路由
// =============================
const route = useRoute()


// =============================
// 商品详情数据
// =============================
const product =
  ref<ProductDetailResponse | null>(null)


// =============================
// 页面状态
// =============================
const errorMessage = ref('')

const loading = ref(false)


// =============================
// 新增：当前显示的主图 URL
// =============================
const activeImageUrl = ref('')


// =============================
// 加载商品详情
// =============================
async function loadProduct() {

  // URL 中的 id 默认是字符串，
  // 所以转换成 number。
  const id = Number(route.params.id)


  // 清空上一件商品的数据
  product.value = null

  // 清空上一件商品的主图
  activeImageUrl.value = ''

  // 清空旧错误
  errorMessage.value = ''


  // =============================
  // 商品 ID 校验
  // =============================
  if (!Number.isInteger(id) || id <= 0) {
    errorMessage.value = '商品 ID 不合法'
    return
  }


  // 开始加载
  loading.value = true


  try {

    // =============================
    // 调用商品详情 RPC
    // =============================
    const data =
      await getProductDetail(id)


    // 保存商品详情
    product.value = data


    // =============================
    // 初始化主图
    // =============================
    //
    // 优先使用 images 第一张图片。
    //
    // 如果 images 是空数组：
    //
    // data.images[0]
    // ↓
    // undefined
    //
    // ?.url
    // ↓
    // undefined
    //
    // 然后通过 ??
    // 使用原来的 imageUrl 作为兜底。
    //
    activeImageUrl.value =
      data.images[0]?.url ?? data.imageUrl

  } catch (error) {

    console.error(error)

    errorMessage.value =
      '商品加载失败，请稍后重试'

  } finally {

    // 不管成功还是失败，
    // 请求结束后都关闭 loading。
    loading.value = false

  }
}


// =============================
// 监听路由商品 id
// =============================
//
// 第一次进入页面：
// immediate: true
// ↓
// 自动执行 loadProduct()
//
// /product/1 → /product/2
// ↓
// route.params.id 变化
// ↓
// 再执行一次 loadProduct()
//
watch(
  () => route.params.id,

  () => {
    loadProduct()
  },

  {
    immediate: true,
  },
)
</script>
