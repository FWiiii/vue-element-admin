import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import storage from 'good-storage'
import { useDark } from '@vueuse/core'
import { storagePrefixKey } from '@/config/app'

const ACK = `${storagePrefixKey}Aside`
const DMK = `${storagePrefixKey}Dark`
const TCK = `${storagePrefixKey}Chrome`

const initTabs = [
  {
    title: '首页',
    path: '/dashboard',
    closable: false,
  },
]

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      tabsChrome: cloneDeep(initTabs), // 导航栏,没有值的时候需要默认打开首页
      asideCollapse: storage.get(ACK, false), // 侧边栏
      isDarkMode: useDark({ storageKey: DMK }), // 黑暗模式
    }
  },
  actions: {
    toggleAside() {
      this.asideCollapse = !this.asideCollapse
      storage.set(ACK, this.asideCollapse)
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    pushTabsChrome(t) {
      const hasTab = this.tabsChrome.find(r => r.path == t.path)
      if (hasTab)
        return
      this.tabsChrome.push(t)
    },
    removeTabChrome(t) {
      let index = -1
      this.tabsChrome.forEach((r, i) => {
        if (r.path == t.path)
          index = i
      })
      if (index == -1)
        return null
      this.tabsChrome.splice(index, 1)
      return this.tabsChrome[this.tabsChrome.length - 1]
    },
    removeAllTab() {
      this.tabsChrome = cloneDeep(initTabs)
    },
  },
})
