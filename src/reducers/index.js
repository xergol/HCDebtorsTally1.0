import { combineReducers } from 'redux'
import participants from './partReducer'
import alert from './alert'
import auth from './auth'

export default combineReducers({
    part: participants,
    alert,
    auth
})
