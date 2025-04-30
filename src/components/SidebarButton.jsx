import { tv } from 'tailwind-variants'

function SidebarButton({ children, color }) {
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
      <a href="#" className={sidebar({ color })}>
        {children}
      </a>
    </>
  )
}

export default SidebarButton
