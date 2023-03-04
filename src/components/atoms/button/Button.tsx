interface Props {
  text: string
  type: 'primary-l' | 'primary-s' | 'secondary' | 'destructive'
  className?: string
  onClick: () => void
}

function Button({ text, className, type, onClick }: Props) {
  const btnClassName = () => {
    const base = `btn btn--${type}`
    return className ? `${base} ${className}` : base
  }

  return (
    <button className={btnClassName()} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
