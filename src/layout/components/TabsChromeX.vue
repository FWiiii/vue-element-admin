<script setup>
import VTab from './Tab.vue'

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  activePath: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['clickTab', 'removeTab'])

function clickTab(t) {
  if (t.path == props.activePath)
    return

  emit('clickTab', t)
}
function removeTab(t) {
  if (props.tabs.length == 1) {
    // 最少保留一个
    return
  }
  emit('removeTab', t)
}
</script>

<template>
  <div class="tabs">
    <VTab
      v-for="t in tabs"
      :tab="t"
      :active="activePath === t.path"
      @click="clickTab(t)"
      @closeTab="removeTab(t)"
    />
  </div>
</template>

<style scoped lang="scss">
.tabs {
  padding: 8px;
  display: flex;
  width: 100%;
}
</style>
