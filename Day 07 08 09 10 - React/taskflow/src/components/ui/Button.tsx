import type { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'default' | 'primary' | 'danger'
}

function Button({ variant = 'default', type = 'button', className, ...rest }: ButtonProps) {
  const classes = ['task-button']
  if (variant !== 'default') classes.push('task-button-' + variant)
  if (className) classes.push(className)

  return <button type={type} className={classes.join(' ')} {...rest} />
}

export default Button