<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import TabsChromeX from '@/layout/components/TabsChromeX.vue'

const route = useRoute()
const router = useRouter()
const activePath = ref(route.path)
const appStore = useAppStore()
const { tabsChrome } = storeToRefs(appStore)

router.afterEach((to) => {
  // 当前路由不执行
  activePath.value = to.path
  pushThisRoute(to.path, to.meta.title)
})

function pushThisRoute(path, title) {
  const tab = { path, title, closable: true }
  appStore.pushTabsChrome(tab)
}
// 刷新时当前的页面
pushThisRoute(route.path, route.meta.title)

function clickTab(t) {
  router.push(t.path)
}
function removeTab(t) {
  const r = appStore.removeTabChrome(t)
  if (r)
    router.push(r.path)
}

function removeAllTab() {
  router.push('/')
  appStore.removeAllTab()
}
</script>

<template>
  <div class="nav-tab">
    <div class="tabs-chrome">
      <TabsChromeX
        ref="tabRef" :tabs="tabsChrome" :active-path="activePath" @clickTab="clickTab"
        @removeTab="removeTab"
      />
    </div>

    <div class="nav-action">
      <el-dropdown>
        <div class="more-btn">
          <el-icon>
            <MoreFilled />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="removeAllTab">
              <el-icon>
                <CloseBold />
              </el-icon>
              关闭全部标签
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-tab {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: rgba(128, 128, 128, 0.2) 1px solid;
  border-left: none;
  border-right: none;

  .tabs-chrome {
    flex: 1;
    overflow-x: auto;

    .tabs-main {
      cursor: pointer;
    }

    .tabs-close {
      border-radius: 50%;
      cursor: pointer;
    }

    .tabs-label {
      font-size: 14px;
      color: var(--system-primary-color);
      //#409eff
    }
  }

  .nav-action {
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .more-btn {
      cursor: pointer;
    }
  }

  @at-root .dark {
    .nav-tab {
      background-color: #000;
    }
  }
}
</style>
