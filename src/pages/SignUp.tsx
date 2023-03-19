import signupIcon from '../assets/icon-signup.svg'
import SignForm from '../features/signForm/SignForm/SignForm'

const SignUp = () => {
  return (
    <div className="sign-up sign-form__wrapper">
      <section className="sign-form">
        <div className="sign-form__top">
          <img className="sign-form__icon" src={signupIcon} alt="User" />
          <h1 className="heading-xl sign-form__title">Create an account!</h1>
        </div>
        <SignForm signup={true} />
      </section>
    </div>
  )
}

export default SignUp
