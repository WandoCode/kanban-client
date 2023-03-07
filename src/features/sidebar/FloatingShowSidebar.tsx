import iconEyeShow from '../../assets/icon-show-sidebar.svg'
import { useAppDispatch } from '../app.store'
import Button from '../../components/atoms/Button/Button'
import { openMenu } from './sidebar.actions'

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
