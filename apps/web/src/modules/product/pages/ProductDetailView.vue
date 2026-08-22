<template>
  <div class="p-8">

    <h1 class="text-2xl font-bold">
      商品详情页
    </h1>

    <p class="mt-4">
      商品 ID：{{ route.params.id }}
    </p>

    <!-- 请求成功以后 product 才有值 -->
    <div v-if="product" class="mt-6">
      <h2 class="text-xl font-bold">
        {{ product.title }}
      </h2>

      <p class="mt-2 text-xl">
        ¥{{ product.price }}
      </p>



    </div>
    <!-- 新增：请求失败时显示错误 -->
    <p
      v-if="errorMessage"
      class="mt-6 text-red-500"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {getProductDetail , type ProductDetailResponse} from '@/modules/product/api/product.api.ts'

// 获取当前路由信息
const route = useRoute()

const product = ref<ProductDetailResponse | null>(null)
const errorMessage = ref('')
async function loadProduct() {
  const id = Number(route.params.id)
  // 每次请求前先清空旧错误
  errorMessage.value = ''

  try {
    // 调用商品详情 RPC
    product.value =
      await getProductDetail(id)
  } catch (error) {
    // 请求失败先打印到控制台
    console.error(error)

    // 页面显示错误
    errorMessage.value =
      '商品加载失败，请稍后重试'
  }
}

// 页面第一次加载完成后，请求商品详情
onMounted(async () => {
  await loadProduct()
})
</script>


