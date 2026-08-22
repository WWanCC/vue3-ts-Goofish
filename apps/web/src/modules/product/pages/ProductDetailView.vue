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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {getProductDetail , type ProductDetailResponse} from '@/modules/product/api/product.api.ts'

// 获取当前路由信息
const route = useRoute()

const product = ref<ProductDetailResponse | null>(null)

// 页面第一次加载完成后，请求商品详情
onMounted(async () => {
  const id = Number(route.params.id)

  // 调用我们之前写好的 RPC 请求
  product.value = await getProductDetail(id)
})
</script>


