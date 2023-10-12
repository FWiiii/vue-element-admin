<script setup>
import { storeToRefs } from 'pinia'
import { useMediaQuery } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { minScreenMaxWidth } from '@/config/app'
import AsideMenu from '@/layout/AsideMenu.vue'
import HeaderBar from '@/layout/HeaderBar.vue'
import TabsChrome from '@/layout/TabsChrome.vue'

const isMinScreen = useMediaQuery(`(max-width: ${minScreenMaxWidth}px)`)
const appStore = useAppStore()
const { asideCollapse } = storeToRefs(appStore)
</script>

<template>
  <el-container class="main">
    <el-aside v-if="!isMinScreen" :width="asideCollapse ? '64px' : '250px'">
      <AsideMenu />
    </el-aside>
    <div v-else class="aside-drawer">
      <el-drawer
        :size="250"
        :with-header="false"
        :show-close="false"
        :model-value="!asideCollapse"
        direction="ltr"
        @close="appStore.toggleAside()"
      >
        <AsideMenu />
      </el-drawer>
    </div>
    <el-container>
      <el-header>
        <HeaderBar />
      </el-header>
      <TabsChrome />
      <el-main class="cus-scroll">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .el-aside {
    transition: 0.3s;
  }
  .aside-drawer {
    :deep(.el-drawer__body) {
      padding: 0 !important;
    }
  }
  .el-main {
    padding: 20;
    font-family: "Raleway", sans-serif;
  }
  .cus-scroll {
    &::-webkit-scrollbar {
      width: 8px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-track {
      border-radius: 100px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-corner {
      background: #f6f6f6;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: #bfbfbf;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #999999;
      }
    }
  }
}
</style>
