import _ from 'lodash'
import { ACTION } from './actions'

const initialState = {
  currentUser: null,
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SET_USER: {
      return {
        ...state,
        currentUser: action.data.user,
      }
    }
    case ACTION.AUTH_LOGOUT: {
      return _.omit(state, ['currentUser'])
    }
    case ACTION.UPDATE_INFORMATION_SET_USER: {
      return {
        ...state,
        currentUser: action.data.user,
      }
    }
    default: {
      return state
    }
  }
}

export default AuthReducer
