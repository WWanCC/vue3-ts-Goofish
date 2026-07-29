<script setup lang="ts">
const slides = [
  {
    id: 1,
    title: "闲鱼抄底好物",
    description: "超绝性价比，一省到底",
    actionText: "去看看",
    emoji: "🍔",
    background: "linear-gradient(145deg, #ff6a00 0%, #ff9f00 100%)",
  },
  {
    id: 2,
    title: "数码焕新季",
    description: "热门数码，限时好价",
    actionText: "立即抢",
    emoji: "📱",
    background: "linear-gradient(145deg, #4c7cff 0%, #45c4ff 100%)",
  },
  {
    id: 3,
    title: "居家好物节",
    description: "实用好物，轻松淘到",
    actionText: "逛一逛",
    emoji: "🛋️",
    background: "linear-gradient(145deg, #8b5cf6 0%, #d86dff 100%)",
  },
];
</script>

<template>
  <section
    class="overflow-hidden rounded-[16px] xl:w-[226px] xl:shrink-0"
    aria-label="活动推荐"
  >
    <ElCarousel
      height="316px"
      trigger="click"
      arrow="hover"
      :interval="5000"
      class="promo-carousel"
    >
      <ElCarouselItem v-for="slide in slides" :key="slide.id">
        <article
          class="relative flex h-full flex-col overflow-hidden px-5 py-7 text-white"
          :style="{ background: slide.background }"
        >
          <!-- 装饰圆形 -->
          <span
            class="absolute -top-10 -right-8 size-32 rounded-full bg-white/15"
          ></span>

          <span
            class="absolute right-3 bottom-12 size-24 rounded-full bg-yellow-300/30"
          ></span>

          <h2 class="relative text-[26px] leading-tight font-black">
            {{ slide.title }}
          </h2>

          <p class="relative mt-2 text-sm font-medium text-white/90">
            {{ slide.description }}
          </p>

          <div
            class="relative flex flex-1 items-center justify-center text-[82px]"
            aria-hidden="true"
          >
            {{ slide.emoji }}
          </div>

          <button
            type="button"
            class="relative mx-auto rounded-full bg-[#ffe500] px-6 py-2 text-base font-bold text-[#222] transition-transform hover:scale-105"
          >
            {{ slide.actionText }}
            <span aria-hidden="true">›</span>
          </button>
        </article>
      </ElCarouselItem>
    </ElCarousel>
  </section>
</template>

<style scoped>
.promo-carousel :deep(.el-carousel__container) {
  border-radius: 16px;
}

.promo-carousel :deep(.el-carousel__button) {
  width: 18px;
  height: 4px;
  border-radius: 9999px;
}
</style>
