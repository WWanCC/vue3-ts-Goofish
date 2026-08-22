<template>
  <!-- 修改：整个详情页使用闲鱼类似的浅灰背景 -->
  <div class="min-h-screen bg-[#f5f6f7] px-4 py-6">

    <main class="mx-auto max-w-[1200px]">

      <!-- 加载状态 -->
      <p
        v-if="loading"
        class="rounded-2xl bg-white p-6 text-[#999]"
      >
        正在加载商品...
      </p>

      <!-- 错误状态 -->
      <p
        v-if="errorMessage"
        class="rounded-2xl bg-white p-6 text-red-500"
      >
        {{ errorMessage }}
      </p>

      <!-- 商品请求成功后再显示详情 -->
      <template v-if="product">

        <!-- ============================= -->
        <!-- 新增：卖家信息横条 -->
        <!-- ============================= -->
        <section
          class="flex items-center gap-3 rounded-2xl bg-white px-5 py-4"
        >
          <!-- 卖家头像 -->
          <img
            :src="product.sellerAvatarUrl"
            :alt="product.sellerName"
            class="size-11 shrink-0 rounded-full object-cover"
          />

          <!-- 卖家文字信息 -->
          <div class="min-w-0">

            <div class="flex items-center gap-2">

              <!-- 卖家昵称 -->
              <span class="truncate font-medium text-[#222]">
                {{ product.sellerName }}
              </span>

              <!-- 卖家信用标签 -->
              <span
                v-if="product.sellerCredit"
                class="shrink-0 rounded bg-[#fff2b2] px-2 py-0.5 text-xs text-[#7a6500]"
              >
                {{ product.sellerCredit }}
              </span>

            </div>

            <!-- 暂时使用已有 location -->
            <p class="mt-1 text-xs text-[#999]">
              {{ product.location }}
            </p>

          </div>
        </section>


        <!-- ============================= -->
        <!-- 新增：商品详情主体 -->
        <!-- ============================= -->
        <section
          class="mt-4 grid gap-8 rounded-2xl bg-white p-5 md:grid-cols-2"
        >

          <!-- 左侧：商品图片区域 -->
          <div
            class="flex min-h-[500px] items-center justify-center overflow-hidden rounded-2xl bg-[#f5f5f5]"
          >
            <img
              :src="product.imageUrl"
              :alt="product.title"
              class="max-h-[620px] max-w-full object-contain"
            />
          </div>


          <!-- 右侧：商品信息 -->
          <div class="py-4">

            <!-- 价格 -->
            <div class="text-[#ff4f24]">

              <span class="text-lg font-semibold">
                ¥
              </span>

              <span class="text-4xl font-bold">
                {{ product.price }}
              </span>

              <!-- 原价存在时显示 -->
              <del
                v-if="product.originalPrice"
                class="ml-3 text-sm font-normal text-[#aaa]"
              >
                ¥{{ product.originalPrice }}
              </del>

            </div>


            <!-- 包邮 -->
            <div class="mt-4">
              <span
                v-if="product.shippingIncluded"
                class="rounded bg-[#ffe500] px-2 py-1 text-xs font-medium text-[#222]"
              >
                包邮
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


            <!-- 地区 -->
            <div class="mt-6 text-sm text-[#999]">
              发布地区：
              <span class="text-[#555]">
                {{ product.location }}
              </span>
            </div>

          </div>

        </section>

      </template>

    </main>
  </div>
</template>




<script lang="ts" setup>
import { ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import {getProductDetail , type ProductDetailResponse} from '@/modules/product/api/product.api.ts'

// 获取当前路由信息
const route = useRoute()

const product = ref<ProductDetailResponse | null>(null)
const errorMessage = ref('')
const loading = ref(false)

async function loadProduct() {
  const id = Number(route.params.id)

  product.value = null
  // 每次请求前先清空旧错误
  errorMessage.value = ''

  if (!Number.isInteger(id) || id <= 0) {
    errorMessage.value = '商品 ID 不合法'
    return
  }

  loading.value = true

  try {
    // 调用商品详情 RPC
    product.value = await getProductDetail(id)
  } catch (error) {
    // 请求失败先打印到控制台
    console.error(error)

    // 页面显示错误
    errorMessage.value =
      '商品加载失败，请稍后重试'
  }
  finally {
    loading.value = false
  }
}


watch(
  () => route.params.id,
  ()=>{loadProduct()},
  {immediate: true}
)
</script>


