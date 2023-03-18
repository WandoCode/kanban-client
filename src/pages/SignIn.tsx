import authStore from '../store/authStore'
import { useAppDispatch } from '../features/app.store'
import { connectUser } from '../features/session/session.actions'
const SignIn = () => {
  const dispatch = useAppDispatch()

  const logUser = async () => {
    let userID
    if (window.location.hostname === 'localhost') {
      userID = await authStore.connectMockUser()
      if (!userID) userID = await authStore.initMockUser()
    } else {
      userID = await authStore.logginUser('???', '???')
    }

    if (userID) dispatch(connectUser(userID))
  }

  return (
    <div>
      <button onClick={logUser}>Log in</button>
    </div>
  )
}

export default SignIn
