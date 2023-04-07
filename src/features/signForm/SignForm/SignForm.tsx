import InputText from '../../../components/atoms/Input/InputText'
import { useAppDispatch, useAppSelector } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import { Link } from 'react-router-dom'
import {
  updateSignFormDatas,
  resetErrorSignForm,
  setSignFormErrors,
  resetSignForm,
} from '../signForm.actions'
import {
  logInUserOrNotifyError,
  createUserOrNotifyError,
} from '../../session/session.thunks'
import { useEffect } from 'react'
import { SignFormErrorsValues } from '../signForm.reducer'

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
    dispatch(resetSignForm())
  }, [])

  const logUser = async () => {
    const errors = validateForm()

    if (errors.length !== 0) {
      dispatch(setSignFormErrors(errors))
      return
    }
    dispatch(logInUserOrNotifyError())
    dispatch(resetErrorSignForm())
  }

  const createUser = () => {
    const errors = validateForm()

    if (errors.length !== 0) {
      dispatch(setSignFormErrors(errors))
      return
    }

    dispatch(createUserOrNotifyError())
  }

  const validateForm = () => {
    const errors: SignFormErrorsValues[] = []

    if (!formDatas.email.match(/[A-Z-_.+]{2,}@[A-Z-_+]{2,}\.[A-Z]{1,}/i))
      errors.push('email')

    if (formDatas.password.length === 0) errors.push('emptyPassword')

    if (signup && formDatas.confirmation !== formDatas.password)
      errors.push('samePassword')

    if (signup && formDatas.confirmation.length === 0)
      errors.push('emptyConfirmation')

    return errors
  }

  return (
    <form className="sign-form__form modal-add-task">
      <InputText
        value={formDatas.email}
        label="Email"
        placeholder="max@gmail.com"
        hasError={formError.email}
        errorText="Invalid email"
        id="email"
        onChange={(e) => dispatch(updateSignFormDatas(e.target.value, 'email'))}
      />
      <InputText
        value={formDatas.password}
        password={true}
        placeholder="123456"
        label="Password"
        hasError={formError.samePassword || formError.emptyPassword}
        errorText="Email/password incorrect"
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
          hasError={formError.samePassword || formError.emptyConfirmation}
          errorText="Email/password incorrect"
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
        {formError.connexion && (
          <p className="fc-primary-800">
            Wrong user and/or pasword. Try again.
          </p>
        )}
      </div>
    </form>
  )
}

export default SignForm
