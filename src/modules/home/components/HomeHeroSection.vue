<script setup lang="ts">
import CategoryMenu from "./CategoryMenu.vue";
import FeaturedPanel from "./FeaturedPanel.vue";
import PromoBanner from "./PromoBanner.vue";
</script>

<template>
  <section
    class="mb-6 flex flex-col gap-3 xl:h-[316px] xl:flex-row"
    aria-label="首页推荐区域"
  >
    <CategoryMenu />

    <PromoBanner />

    <FeaturedPanel />
  </section>
</template>
