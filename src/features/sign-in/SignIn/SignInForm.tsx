import InputText from '../../../components/atoms/Input/InputText'
import { useAppDispatch, useAppSelector } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import { Link } from 'react-router-dom'
import { updateSignInFormDatas, setSignInFormHasError } from '../signIn.actions'
import { logInUserOrNotifyError } from '../../session/session.thunks'

const SignInForm = () => {
  const dispatch = useAppDispatch()
  const { formDatas, hasError } = useAppSelector((s) => s.signIn)

  if (window.location.hostname === 'localhost') {
    dispatch(updateSignInFormDatas('max@gmail.com', 'email'))
    dispatch(updateSignInFormDatas('123456', 'password'))
  }

  const logUser = async () => {
    dispatch(logInUserOrNotifyError())
    dispatch(setSignInFormHasError(false))
  }

  return (
    <form className="sign-form__form modal-add-task">
      <InputText
        value={formDatas.email}
        label="Email"
        placeholder="smith@gmail.com"
        hasError={hasError}
        errorText="Invalid email"
        id="email"
        onChange={(e) => {
          dispatch(updateSignInFormDatas(e.target.value, 'email'))
        }}
      />
      <InputText
        value={formDatas.password}
        password={true}
        placeholder="*************"
        label="Password"
        hasError={hasError}
        errorText="email and/or password incorrect"
        id="password"
        onChange={(e) => {
          dispatch(updateSignInFormDatas(e.target.value, 'password'))
        }}
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
