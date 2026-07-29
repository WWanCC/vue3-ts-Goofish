<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import AppHeader from './components/layout/AppHeader.vue';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <AppHeader/>
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
