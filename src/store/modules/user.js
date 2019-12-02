import { login, logout,  refreshToken, getElement } from '@/api/user'
import { getToken, setToken, removeToken, setExpireTime, getExpireTime } from '@/utils/auth'
import { message } from 'ant-design-vue'
import { Store } from 'vuex'
import store from '..'


const state = {
  token: getToken(),
  expires_in: getExpireTime(),
  element: [],
  info: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_EXPIRE: (state, time) => {
    state.expires_in = time
  },
  SET_ELEMENT: (state, element) => {
    state.element = element
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log('this is login')
    return new Promise((resolve, reject) => {
      login({ name: username.trim(), password: password }).then(response => {
        const { data } = response
        this.dispatch('user/setToken', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(response => {
        this.dispatch('user/resetToken')
        message.success(response.message)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  setToken({ commit }, data) {
    commit('SET_TOKEN', data.token)  // token存入vuex
    setToken(data)  // token存入cookie\
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')  // 删除vuex中的token
      // commit('SET_ROLES', [])
      removeToken()  // 删除Cookie中的token

      resolve()  // 产生一个新的Promise？
    })
  },

  refreshToken({ commit }) {
    return new Promise(resolve => {
      refreshToken().then(response => {
        const { data } = response
        this.dispatch('user/setToken', data)
      })
      resolve()
    })
  },

  getElement({ commit }) {
    console.log('this is permission')
    return new Promise((resolve, reject) => {
      getElement().then(response => {
        const { data } = response
        this.dispatch('user/setElement', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  info({ commit }, data){
    commit('SET_INFO', data)
  },

  setElement({ commit }, data) {
    commit('SET_ELEMENT', data)  // token存入vuex
  }

}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
