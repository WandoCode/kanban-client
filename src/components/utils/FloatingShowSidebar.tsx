import iconEyeShow from '../../assets/icon-show-sidebar.svg'
import { useAppDispatch } from '../../features/app.store'
import { openMenu } from '../../features/generalState/generalState.actions'

function FloatingShowSidebar() {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(openMenu())
  }
  return (
    <div className="hide-mobile">
      <div className="floating-show-sidebar">
        <button
          className="floating-show-sidebar__btn btn btn--primary-l"
          onClick={handleClick}
        >
          <img src={iconEyeShow} alt="Board" />
        </button>
      </div>
    </div>
  )
}

export default FloatingShowSidebar
