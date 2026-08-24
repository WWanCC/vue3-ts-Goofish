<script setup lang="ts">
import type {ProductItem} from "../types";
import {RouterLink} from 'vue-router'

defineProps<{
  product: ProductItem;
}>();
</script>

<template>
  <!--  router-link渲染成a标签-->
  <RouterLink :to="{
    name:'product-detail',
    params: {id:product.id}
  }" class="block h-full text-inherit no-underline">
    <article
      class="group h-full min-w-0 cursor-pointer rounded-[14px] p-1 transition-colors hover:bg-[#fafafa]"
    >
      <!-- 商品图片 -->
      <div class="aspect-square overflow-hidden rounded-[14px] bg-[#f2f3f5]">
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
      <div v-if="product.serviceTag" class="mt-1.5">
      <span class="rounded border border-[#ff9a73] px-1 py-0.5 text-xs text-[#ff5a26]">
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
      <div class="mt-1.5 flex min-w-0 items-center gap-1 text-xs text-[#999]">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" class="size-3.5 shrink-0">
          <path
            d="M12 21C12 21 19 16.6 19 10.5C19 6.36 15.87 3 12 3C8.13 3 5 6.36 5 10.5C5 16.6 12 21 12 21Z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />

          <circle cx="12" cy="10" r="2.3" stroke="currentColor" stroke-width="1.8"/>
        </svg>

        <span class="truncate">
        {{ product.location }}
      </span>
      </div>

      <!-- 商品价格 -->
      <div class="mt-2 flex min-w-0 items-baseline gap-1.5">
        <p class="shrink-0 text-[#ff4f24]">
          <span class="text-sm font-semibold"> ¥ </span>

          <span class="text-[22px] leading-none font-bold">
          {{ product.price }}
        </span>
        </p>

        <!-- 想要人数 -->
        <span class="shrink-0 text-xs text-[#999]"> {{ product.wantedCount }}人想要 </span>

        <!-- 原价可能不存在 -->
        <del v-if="product.originalPrice" class="min-w-0 truncate text-xs text-[#aaa]">
          ¥{{ product.originalPrice }}
        </del>
      </div>

      <!-- 卖家信息 -->
      <div class="mt-2 flex min-w-0 items-center gap-1.5" v-if="product.seller">
        <img
          :src="product.seller.avatarUrl"
          :alt="product.seller.nickname"
          loading="lazy"
          class="size-5 shrink-0 rounded-full bg-[#f2f3f5] object-cover"
        />

        <span :title="product.seller.nickname" class="min-w-0 truncate text-xs text-[#777]">
        {{ product.seller.nickname }}
      </span>

        <!-- 信用标签可能不存在 -->
        <span
          v-if="product.seller.credit"
          class="ml-auto shrink-0 rounded-full bg-[#fff1e8] px-2 py-0.5 text-xs text-[#ff6b2c]"
        >
        {{ product.seller.credit }}
      </span>
      </div>
    </article>
  </RouterLink>
</template>
