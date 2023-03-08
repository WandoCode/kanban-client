import { MouseEvent } from 'react'

interface Props {
  text: string
  type: 'primary-l' | 'primary-s' | 'secondary' | 'destructive'
  className?: string
  imgRef?: string
  onClick: (e: MouseEvent) => void
}

function Button({ text, className, type, onClick, imgRef }: Props) {
  const btnClassName = () => {
    const base = `btn btn--${type}`
    return className ? `${base} ${className}` : base
  }

  return (
    <button className={btnClassName()} onClick={onClick}>
      {imgRef && <img src={imgRef} alt=" " />}

      {text}
    </button>
  )
}

export default Button
