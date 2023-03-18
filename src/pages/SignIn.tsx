import authStore from '../store/authStore'
import { useAppDispatch } from '../features/app.store'
import { connectUser } from '../features/session/session.actions'
const SignIn = () => {
  const dispatch = useAppDispatch()

  const logUser = async () => {
    const userID = await authStore.logginUser('max@gmail.com', '123456')
    if (userID) dispatch(connectUser(userID))
  }

  return (
    <div>
      <button onClick={logUser}>Log in</button>
    </div>
  )
}

export default SignIn
