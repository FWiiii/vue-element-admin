<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  tab: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["closeTab"]);

const closeTab = () => {
  emit("closeTab", props.tab);
};
</script>

<template>
  <div class="tab" :class="{ active }">
    <div class="title">
      {{ tab.title }}
    </div>
    <div
      @click.stop="closeTab"
      class="close-icon"
      v-if="active && tab.closable"
    >
      <svg width="16" height="16" stroke="#595959">
        <path d="M 4 4 L 12 12 M 12 4 L 4 12"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab {
  // border-top-left-radius: 5px;
  // border-top-right-radius: 5px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  max-width: 110px;
  min-width: 100px;
  flex: 1;
  font-size: 14px;
  transition: background-color 0.3s;
  border: rgba(128, 128, 128, 0.2) solid 1px;
  margin-right: 5px;
  border-radius: 5px;
  height: 30px;

  .title {
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @at-root .dark {
    .tab {
      &.active {
        background-color: #121212;
      }
    }
  }
  &.active {
    background-color: #ecf5ff;
    border-color: #ecf5ff;
  }

  .close-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;

    &:hover {
      background-color: #fff;
    }
  }
}
</style>
