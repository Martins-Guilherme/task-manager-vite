import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { tv } from 'tailwind-variants'

function SidebarButton({ children, to }) {
  const sidebar = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3 text-brand-dark-blue',
    variants: {
      color: {
        selected: 'bg-[#E6F7F8] text-brand-primary',
        unselected: 'text-brand-dark-blue',
      },
    },
  })
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          sidebar({ color: isActive ? 'selected' : 'unselected' })
        }
      >
        {children}
      </NavLink>
    </>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'unselected']),
}

export default SidebarButton
