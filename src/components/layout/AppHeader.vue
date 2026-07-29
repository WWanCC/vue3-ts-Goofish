<script setup lang="ts">
import { ref } from "vue";

/**
 * 搜索框当前输入的内容。
 */
const keyword = ref("");

/**
 * 搜索框下方的热门搜索词。
 */
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

/**
 * 执行搜索。
 *
 * 当前只在控制台打印关键词，
 * 后续再接入搜索结果页和接口。
 */
function handleSearch(searchKeyword = keyword.value) {
  const normalizedKeyword = searchKeyword.trim();

  if (!normalizedKeyword) {
    return;
  }

  // 点击热门关键词时，
  // 同时把它显示到搜索框中。
  keyword.value = normalizedKeyword;

  console.log("准备搜索：", normalizedKeyword);
}
</script>

<template>
  <header class="bg-[#ffe500]">
    <div class="mx-auto flex max-w-[1480px] items-start gap-8 px-6 py-3">
      <!-- 左侧 Logo -->
      <RouterLink
        :to="{ name: 'home' }"
        class="mt-1 shrink-0 text-[40px] leading-none font-black text-[#222]"
      >
        闲鱼
      </RouterLink>

      <!-- 中间搜索区域 -->
      <div class="min-w-0 flex-1">
        <!--
          form 表示这是一个搜索表单。

          @submit.prevent：
          1. 监听表单提交；
          2. 阻止浏览器默认刷新页面；
          3. 调用 handleSearch。
        -->
        <form
          class="flex h-10 items-center rounded-full border-2 border-[#222] bg-white pr-1 pl-5"
          @submit.prevent="handleSearch()"
        >
          <input
            v-model="keyword"
            type="search"
            placeholder="手机支架"
            class="min-w-0 flex-1 bg-transparent text-sm text-[#222] outline-none"
          />

          <button
            type="submit"
            class="h-8 shrink-0 rounded-full bg-[#ffe500] px-5 text-sm text-[#222]"
          >
            搜索
          </button>
        </form>

        <!-- 热门搜索词 -->
        <div class="mt-1.5 flex items-center gap-4 overflow-hidden px-4">
          <button
            v-for="item in hotKeywords"
            :key="item"
            type="button"
            class="shrink-0 text-xs text-[#333] hover:text-[#ff4f24]"
            @click="handleSearch(item)"
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
