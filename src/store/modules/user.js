import { defineStore } from 'pinia'
import storage from 'good-storage'
import { storagePrefixKey } from '@/config/app'
import service from '@/utils/request'
import { removeToken } from '@/utils/useStorage'

const UIK = `${storagePrefixKey}User`

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      info: {},
    }
  },
  getters: {
    role: state => state.info?.role,
    name: state => state.info?.name,
    userId: state => state.info?.id,
  },
  actions: {
    updateUserInfo(user) {
      this.info = user
      storage.set(UIK, user)
    },
    loginOut() {
      removeToken()
      this.info = {}
      window.location.reload()
    },
    async getUserInfo() {
      try {
        const result = await service.get('/user/getUser')
        const res = result.data
        if (res.code === 0) {
          const { id, name, role } = res.data
          this.info = { id, name, role }
          return Promise.resolve(res.data)
        }
        else {
          return Promise.reject(res)
        }
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
  },
})
