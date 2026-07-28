<script setup lang="ts">
import type { ProductItem } from "../types";

defineProps<{
  product: ProductItem;
}>();
</script>

<template>
  <article>
    <img :src="product.imageUrl" :alt="product.title" />

    <h3>{{ product.title }}</h3>

    <p>¥{{ product.price }}</p>

    <p>{{ product.location }}</p>
  </article>
</template>
