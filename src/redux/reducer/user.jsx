import {login} from '../../api/login'
import {LOGIN_IN} from '../actionTypes'
import {getToken} from '../../../src/utils/auth'
const initValue={
  user:{},
  token:''
}
export const user = (state = initValue, action) => {
  let {form} =  action
  switch (action.type) {
    case LOGIN_IN:
     return  login(form).then(res=>{
          state.token = getToken();
        }).catch(err=>{
          console.log(err)
        })
    default:
      return state
  }
}