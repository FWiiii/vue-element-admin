<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import RouteMenu from './components/RouteMenu.vue'
import { appName } from '@/config/app'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const { asideCollapse } = storeToRefs(appStore)
const { menus } = storeToRefs(permissionStore)
</script>

<template>
  <div class="aside">
    <div class="logo">
      <img v-if="asideCollapse" src="@/assets/vue.svg" alt="">
      <span v-else>
        <img
          style="width: 20px; margin-right: 6px; position: relative; top: 3px"
          src="@/assets/vue.svg"
          alt=""
        >{{ appName }}
      </span>
    </div>
    <el-menu
      class="menu"
      :collapse="asideCollapse"
      router
      :collapse-transition="true"
      :default-active="route.path"
    >
      <RouteMenu
        v-for="menu in menus"
        :key="menu.path"
        :path="menu.path"
        :menu="menu"
      />
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.aside {
  border-right: 1px solid #dcdfe6;
  height: 100vh;
  overflow: hidden;
  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 40px;
    }
  }
  .menu {
    height: calc(100vh - 60px);
    overflow-y: auto;
    border-right: none;
  }
}
</style>
