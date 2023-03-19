import signinIcon from '../assets/icon-exit.svg'
import SignForm from '../features/signForm/SignForm/SignForm'

const SignIn = () => {
  return (
    <div className="sign-in sign-form__wrapper">
      <section className="sign-form">
        <div className="sign-form__top">
          <img className="sign-form__icon" src={signinIcon} alt="User" />
          <h1 className="heading-xl fc-neutral-600 sign-form__title">
            Welcome!
          </h1>
          <h2 className="heading-m fc-neutral-400 sign-form__subtitle">
            Sign In your account
          </h2>
        </div>
        <SignForm />
      </section>
    </div>
  )
}

export default SignIn
