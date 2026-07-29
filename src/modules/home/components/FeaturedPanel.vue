<script setup lang="ts">
interface FeaturedItem {
  name: string;
  price: string;
  emoji: string;
}

interface FeaturedGroup {
  id: number;
  title: string;
  subtitle: string;
  background: string;
  borderColor: string;
  items: FeaturedItem[];
}

const groups: FeaturedGroup[] = [
  {
    id: 1,
    title: "衣橱捡漏",
    subtitle: "时尚美衣低价淘",
    background: "#fff8b8",
    borderColor: "#f2d500",
    items: [
      { name: "休闲鞋", price: "¥248", emoji: "👞" },
      { name: "春季外套", price: "¥69", emoji: "👕" },
      { name: "潮流穿搭", price: "¥5", emoji: "👗" },
    ],
  },
  {
    id: 2,
    title: "手机数码",
    subtitle: "热门装备省心入",
    background: "#c8f5fb",
    borderColor: "#66dce9",
    items: [
      { name: "无线耳机", price: "¥17.90", emoji: "🎧" },
      { name: "电子书", price: "¥20", emoji: "📖" },
      { name: "智能手表", price: "¥140", emoji: "⌚" },
    ],
  },
  {
    id: 3,
    title: "二次元",
    subtitle: "受欢迎新品随手入",
    background: "#c9f9d3",
    borderColor: "#67dd83",
    items: [
      { name: "模型玩具", price: "¥20", emoji: "🤖" },
      { name: "游戏周边", price: "¥17.80", emoji: "🎮" },
      { name: "动漫服饰", price: "¥54", emoji: "🧥" },
    ],
  },
  {
    id: 4,
    title: "省钱卡券",
    subtitle: "吃喝玩乐放心购",
    background: "#fbd5e9",
    borderColor: "#ef9fc8",
    items: [
      { name: "电影票", price: "¥17", emoji: "🎫" },
      { name: "充值卡", price: "¥196", emoji: "💳" },
      { name: "优惠券", price: "¥5", emoji: "🎟️" },
    ],
  },
];
</script>

<template>
  <section
    class="grid min-w-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2"
    aria-label="精选主题"
  >
    <article
      v-for="group in groups"
      :key="group.id"
      class="flex min-h-[150px] min-w-0 gap-3 overflow-hidden rounded-[16px] border-4 p-3"
      :style="{
        backgroundColor: group.background,
        borderColor: group.borderColor,
      }"
    >
      <!-- 左侧标题 -->
      <div class="w-[104px] shrink-0">
        <h2 class="text-xl leading-tight font-black text-[#222]">
          {{ group.title }}
          <span aria-hidden="true">➜</span>
        </h2>

        <p class="mt-1 text-xs leading-5 text-[#555]">
          {{ group.subtitle }}
        </p>

        <div class="mt-4 text-[44px]" aria-hidden="true">
          🛍️
        </div>
      </div>

      <!-- 右侧商品 -->
      <div class="flex min-w-0 flex-1 gap-2">
        <button
          v-for="item in group.items"
          :key="item.name"
          type="button"
          class="flex min-w-0 flex-1 flex-col items-center justify-between rounded-[12px] bg-white/80 px-1.5 py-2 transition-transform hover:-translate-y-0.5"
        >
          <span
            class="flex min-h-16 w-full items-center justify-center overflow-hidden rounded-lg bg-white text-[38px]"
            aria-hidden="true"
          >
            {{ item.emoji }}
          </span>

          <span class="mt-1 w-full truncate text-center text-xs text-[#666]">
            {{ item.name }}
          </span>

          <strong class="text-sm text-[#ff4f24]">
            {{ item.price }}
          </strong>
        </button>
      </div>
    </article>
  </section>
</template>
