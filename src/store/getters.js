const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // token快捷访问
  name: state => state.user.userInfo.username, // 用户名快捷访问
  userId: state => state.user.userInfo.userId, // 用户ID快捷访问
  staffPhoto: state => state.user.userInfo.staffPhoto // 头像快捷访问
  // userInfo: state => state.user.userInfo.username
  // avatar: state => state.user.avatar,
}
export default getters
