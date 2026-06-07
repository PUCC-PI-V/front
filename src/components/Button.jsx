export default function Button({ text, onClick }) {
  const handleClick = onClick || function () {}

  return (
    <button
      onClick={handleClick}
      className="
        min-w-[10rem]
        rounded-full
        border
        border-vibora-cream/70
        bg-transparent
        px-10
        py-3
        font-vibora-ui
        text-sm
        font-semibold
        uppercase
        tracking-[0.25em]
        text-vibora-cream
        transition-all
        duration-200
        hover:bg-vibora-cream/10
        hover:border-vibora-cream
        focus:outline-none
        focus:ring-1
        focus:ring-vibora-cream/50
      "
    >
      {text}
    </button>
  )
}