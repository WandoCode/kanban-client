import signinIcon from '../assets/icon-exit.svg'
import SignInForm from '../components/SignIn/SignInForm'

const SignIn = () => {
  return (
    <div className="sign-in sign-form__wrapper">
      <section className="sign-form">
        <img className="sign-form__icon" src={signinIcon} alt="User" />
        <h1 className="heading-xl sign-form__title">Welkome!</h1>
        <h2 className="text-bold fc-neutral-400 sign-form__subtitle">
          Sign In your account
        </h2>
        <SignInForm />
      </section>
    </div>
  )
}

export default SignIn
