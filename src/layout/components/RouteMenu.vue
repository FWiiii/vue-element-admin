<script setup>
const props = defineProps({
  menu: {
    type: Object,
    default: () => {},
  },
  path: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <el-sub-menu v-if="menu.children && menu.children.length !== 0" :index="path">
    <template #title>
      <el-icon v-if="menu.meta && menu.meta.icon">
        <component :is="menu.meta.icon" />
      </el-icon>
      <span>{{ menu.meta.title }}</span>
    </template>
    <RouteMenu
      v-for="m in menu.children"
      :key="m.path"
      :menu="m"
      :path="`${path}/${m.path}`"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="menu.redirect ? menu.redirect : path">
    <el-icon v-if="menu.meta && menu.meta.icon">
      <component :is="menu.meta.icon" />
    </el-icon>
    <span>{{ menu.meta.title }}</span>
  </el-menu-item>
</template>

<style scoped></style>
