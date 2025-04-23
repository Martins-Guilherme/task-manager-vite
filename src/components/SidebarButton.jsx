function SidebarButton({ children, variant }) {
  const getVariantClasses = () => {
    if (variant == 'unselected') {
      return 'text-[#35383E]'
    }
    if (variant == 'selected') {
      return 'bg-[#E6F7F8] text-[#00ADB5]'
    }
  }
  return (
    <>
      <a
        href="#"
        className={`rounded-lg px-6 py-3 text-[#35383E] ${getVariantClasses()}`}
      >
        {children}
      </a>
    </>
  )
}

export default SidebarButton

{
  /* <a
            href="/tasks"
            className="rounded-lg bg-[#E6F7F8] px-6 py-3 text-[#00ADB5]"
          >
            Minhas tarefas
          </a> */
}
