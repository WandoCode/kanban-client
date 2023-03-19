import signinIcon from '../assets/icon-exit.svg'
import SignInForm from '../features/sign-in/SignIn/SignInForm'

const SignIn = () => {
  return (
    <div className="sign-in sign-form__wrapper">
      <section className="sign-form">
        <div className="sign-form__top">
          <img className="sign-form__icon" src={signinIcon} alt="User" />
          <h1 className="heading-xl sign-form__title">Welcome!</h1>
          <h2 className="heading-m fc-neutral-400 sign-form__subtitle">
            Sign In your account
          </h2>
        </div>
        <SignInForm />
      </section>
    </div>
  )
}

export default SignIn
