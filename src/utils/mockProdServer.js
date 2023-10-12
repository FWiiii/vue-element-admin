import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from '@/mock/modules/user'
import authMock from '@/mock/modules/auth'

export function setupProdMockServer() {
  createProdMockServer([...userMock, ...authMock])
}

// const modules = import.meta.globEager('./modules/*.js')
// const mockModules = []
// Object.keys(modules).forEach((key) => {
//   mockModules.push(...modules[key].default)
// })

// export function setupProdMockServer() {
//   createProdMockServer(mockModules)
// }
