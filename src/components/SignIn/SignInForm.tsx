import InputText from '../atoms/Input/InputText'
import authStore from '../../store/authStore'
import { connectUser } from '../../features/session/session.actions'
import { useAppDispatch } from '../../features/app.store'
import Button from '../atoms/Button/Button'
import { Link } from 'react-router-dom'

const SignInForm = () => {
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
    <form className="sign-form__form modal-add-task">
      <InputText
        value=""
        label="Email"
        placeholder="smith@gmail.com"
        hasError={false}
        errorText="Invalid email"
        id="email"
        onChange={() => {}}
      />
      <InputText
        value=""
        label="Password"
        hasError={false}
        errorText=""
        id="password"
        onChange={() => {}}
      />
      <div className="sign-form__bottom">
        <Link className="sign-form__link" to="/signup">
          Create a new account
        </Link>
        <Button text="Login" type="primary-l" onClick={logUser} />
      </div>
    </form>
  )
}

export default SignInForm
