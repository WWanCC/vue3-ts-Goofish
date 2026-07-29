<script setup lang="ts">
const categories = [
  "手机 / 数码 / 电脑",
  "服饰 / 箱包 / 运动",
  "技能 / 卡券 / 潮玩",
  "母婴 / 美妆 / 个护",
  "家具 / 家电 / 家装",
  "文玩 / 珠宝 / 礼品",
  "食品 / 宠物 / 花卉",
  "图书 / 游戏 / 音像",
  "汽车 / 电动车 / 租房",
  "五金 / 设备 / 农牧",
];
</script>

<template>
  <aside
    class="rounded-[16px] bg-[#f7f7f7] px-4 py-3 xl:w-[226px] xl:shrink-0"
    aria-label="商品分类"
  >
    <ul class="grid grid-cols-1 gap-0.5 sm:grid-cols-2 xl:grid-cols-1">
      <li v-for="(category, index) in categories" :key="category">
        <button
          type="button"
          class="group flex min-h-7 w-full items-center gap-3 rounded-lg px-2 text-left text-sm text-[#333] transition-colors hover:bg-white hover:text-[#ff5a24]"
        >
          <!-- 暂时使用统一图标，后续再按分类替换 -->
          <span
            class="flex size-4 shrink-0 items-center justify-center rounded-full border border-[#555] text-[10px] group-hover:border-[#ff5a24]"
          >
            {{ index + 1 }}
          </span>

          <span class="min-w-0 truncate">
            {{ category }}
          </span>
        </button>
      </li>
    </ul>
  </aside>
</template>
