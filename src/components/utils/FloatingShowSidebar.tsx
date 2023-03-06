import iconEyeShow from '../../assets/icon-show-sidebar.svg'
import { useAppDispatch } from '../../features/app.store'
import { openMenu } from '../../features/generalState/generalState.actions'
import Button from '../atoms/Button/Button'

function FloatingShowSidebar() {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(openMenu())
  }
  return (
    <div className="hide-mobile">
      <div className="floating-show-sidebar">
        <Button
          className="floating-show-sidebar__btn"
          text=""
          type="primary-l"
          imgRef={iconEyeShow}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default FloatingShowSidebar
