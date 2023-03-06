import iconEyeShow from '../../assets/icon-show-sidebar.svg'

function FloatingShowSidebar() {
  return (
    <div className="floating-show-sidebar">
      <button className="board-btn board-btn  btn btn--primary-l btn--transparent">
        <img src={iconEyeShow} alt="Board" />
      </button>
    </div>
  )
}

export default FloatingShowSidebar
