import InputText from '../../../components/atoms/Input/InputText'
import { useAppDispatch, useAppSelector } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import { Link } from 'react-router-dom'
import { updateSignFormDatas, resetErrorSignForm } from '../signForm.actions'
import {
  logInUserOrNotifyError,
  createUserOrNotifyError,
} from '../../session/session.thunks'
import { useEffect } from 'react'

interface Props {
  signup?: boolean
}

const SignForm = ({ signup = false }: Props) => {
  const dispatch = useAppDispatch()
  const { formDatas, formError } = useAppSelector((s) => s.signForm)

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      dispatch(updateSignFormDatas('max@gmail.com', 'email'))
      dispatch(updateSignFormDatas('123456', 'password'))
    }
  }, [])

  const logUser = async () => {
    dispatch(logInUserOrNotifyError())
    dispatch(resetErrorSignForm())
  }

  const createUser = () => {
    dispatch(createUserOrNotifyError())
  }

  return (
    <form className="sign-form__form modal-add-task">
      <InputText
        value={formDatas.email}
        label="Email"
        placeholder="smith@gmail.com"
        hasError={formError.email}
        errorText="Invalid email"
        id="email"
        onChange={(e) => dispatch(updateSignFormDatas(e.target.value, 'email'))}
      />
      <InputText
        value={formDatas.password}
        password={true}
        placeholder="*************"
        label="Password"
        hasError={formError.samePassword}
        errorText="email and/or password incorrect"
        id="password"
        onChange={(e) =>
          dispatch(updateSignFormDatas(e.target.value, 'password'))
        }
      />
      {signup && (
        <InputText
          value={formDatas.confirmation}
          password={true}
          placeholder="*************"
          label="Confirm password"
          hasError={formError.samePassword}
          errorText="email and/or password incorrect"
          id="confirmation"
          onChange={(e) =>
            dispatch(updateSignFormDatas(e.target.value, 'confirmation'))
          }
        />
      )}

      <div className="sign-form__bottom">
        {signup ? (
          <>
            <Link className="sign-form__link" to="/signin">
              You already have an account
            </Link>
            <Button
              text="Create an account"
              type="primary-l"
              onClick={createUser}
            />
          </>
        ) : (
          <>
            <Link className="sign-form__link" to="/signup">
              Create a new account
            </Link>
            <Button text="Login" type="primary-l" onClick={logUser} />
          </>
        )}
      </div>
    </form>
  )
}

export default SignForm
