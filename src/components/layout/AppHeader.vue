<script setup lang="ts">
const hotKeywords = [
  "虚拟Visa支付",
  "笔记本电脑",
  "指甲油",
  "穿戴甲",
  "电动车",
  "打印机",
  "夏凉被",
  "手机挂绳",
  "手机壳",
  "手机支架",
];
</script>

<template>
  <header class="bg-[#ffe500]">
    <div
      class="mx-auto flex max-w-[1480px] items-start gap-8 px-6 py-3"
    >
      <!-- 左侧 Logo -->
      <a
        href="/"
        class="mt-1 shrink-0 text-[40px] leading-none font-black text-[#222]"
      >
        闲鱼
      </a>

      <!-- 中间搜索区域 -->
      <div class="min-w-0 flex-1">
        <!-- 搜索框 -->
        <div
          class="flex h-10 items-center rounded-full border-2 border-[#222] bg-white pl-5 pr-1"
        >
          <input
            type="text"
            placeholder="手机支架"
            class="min-w-0 flex-1 bg-transparent text-sm text-[#222] outline-none"
          />

          <button
            type="button"
            class="h-8 shrink-0 rounded-full bg-[#ffe500] px-5 text-sm text-[#222]"
          >
            搜索
          </button>
        </div>

        <!-- 热门搜索词 -->
        <div class="mt-1.5 flex items-center gap-4 overflow-hidden px-4">
          <button
            v-for="item in hotKeywords"
            :key="item"
            type="button"
            class="shrink-0 text-xs text-[#333] hover:text-[#ff4f24]"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <!-- 右侧入口 -->
      <nav class="mt-2 flex shrink-0 items-center gap-8 text-sm text-[#222]">
        <button type="button">虚拟空间</button>

        <button type="button">订单</button>
      </nav>
    </div>
  </header>
</template>
