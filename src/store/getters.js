const getters = {
    token: state => state.user.token,
    expires_in: state => state.user.expires_in,
    element: state => state.user.element,
    info: state => state.user.info,
    pagesize: state => state.user.pagesize,
  }
  export default getters
  