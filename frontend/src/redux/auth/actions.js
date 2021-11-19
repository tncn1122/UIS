const ACTION = {
  SET_USER_TRIGGER: 'SET_USER_TRIGGER',
  SET_USER: 'SET_USER',
  AUTH_LOGOUT_TRIGGER: 'AUTH_LOGOUT_TRIGGER',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  UPDATE_INFORMATION_TRIGGER_SET_USER: 'UPDATE_INFORMATION_TRIGGER_SET_USER',
  UPDATE_INFORMATION_SET_USER: 'UPDATE_INFORMATION_SET_USER',
}

const setCurrentUserAction = (user) => ({
  type: ACTION.SET_USER_TRIGGER,
  data: { user, redirect: null },
})

const loginSetCurrentUserAction = (user, redirect) => ({
  type: ACTION.SET_USER_TRIGGER,
  data: { user, redirect },
})

const updateCurrentUserAction = (user) => ({
  type: ACTION.UPDATE_INFORMATION_TRIGGER_SET_USER,
  data: { user },
})

const logout = () => ({
  type: ACTION.AUTH_LOGOUT_TRIGGER,
})

module.exports = {
  ACTION,
  setCurrentUserAction,
  loginSetCurrentUserAction,
  updateCurrentUserAction,
  logout,
}
