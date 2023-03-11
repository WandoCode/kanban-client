import ellipsis from '../../assets/icon-vertical-ellipsis.svg'
import { useEffect } from 'react'

interface Props {
  menuIsOpen: boolean
  name: string
  toogleMenu: () => void
  menuItemsWithHandler: { text: string; handler: () => void }[]
}

function EllipsisMenu({
  toogleMenu,
  name,
  menuIsOpen,
  menuItemsWithHandler,
}: Props) {
  useEffect(() => {
    if (menuIsOpen) document.body.addEventListener('click', handleClickBody)

    return () => document.body.removeEventListener('click', handleClickBody)
  }, [menuIsOpen])

  const handleClickBody = (e: MouseEvent) => {
    const htmlElement = e.target as HTMLElement
    if (!htmlElement.hasAttribute('data-no-close')) toogleMenu()
  }

  const menuItemsDOM = () => {
    return menuItemsWithHandler.map((item) => (
      <button
        key={item.text + 'z'}
        className="options__option btn--transparent"
        data-no-close={true}
        onClick={item.handler}
      >
        {item.text}
      </button>
    ))
  }

  return (
    <div className="ellipsis-menu">
      <button
        className={`ellipsis-menu__action btn--transparent`}
        onClick={toogleMenu}
      >
        <img src={ellipsis} alt="Ellipsis" data-no-close={true} />
      </button>
      <div
        className={`ellipsis-menu__menu ellipsis-menu__menu--${name} ellipsis-menu__menu--${
          menuIsOpen ? 'open' : 'close'
        } options`}
        data-no-close={true}
      >
        {menuItemsDOM()}
      </div>
    </div>
  )
}

export default EllipsisMenu
