<template>
  <main>
    <p v-if="loading">正在加载商品……</p>

    <p v-else-if="errorMessage">
      {{ errorMessage }}
    </p>

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}：¥{{ product.price }}
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getHomeProducts } from '@/modules/home/api/home.api'
import type { ProductItem } from '@/modules/home/types'

const products = ref<ProductItem[]>([])
const loading = ref(false)
const errorMessage = ref('')

async function loadProducts() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await getHomeProducts()

    products.value = response.data
  } catch (error) {
    console.error(error)
    errorMessage.value = '商品加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>
