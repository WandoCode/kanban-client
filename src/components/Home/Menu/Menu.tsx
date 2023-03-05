interface Props {
  menuIsOpen: boolean
}

function Menu({ menuIsOpen }: Props) {
  const menuClassName = () => {
    return menuIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  return (
    <div className={menuClassName()}>
      <div className="menu__wrapper">CONTENT</div>
    </div>
  )
}

export default Menu
