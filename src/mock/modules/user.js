import { resolveToken } from '../utils'

const users = {
  admin: {
    id: 1,
    name: 'admin',
    email: 'Ronnie@123.com',
    role: ['admin'],
  },
  editor: {
    id: 2,
    name: 'editor',
    email: 'Ronnie@123.com',
    role: ['editor'],
  },
  guest: {
    id: 3,
    name: 'guest',
    role: [],
  },
}
export default [
  {
    url: '/api/user/getUser',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 0,
        data: {
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
