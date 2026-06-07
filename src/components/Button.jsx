export default function Button({ text, onClick }) {
  const handleClick = onClick || function () {}

  return (
    <button
      onClick={handleClick}
      className="
        w-full
        min-w-0
        rounded-full
        border
        border-vibora-cream/70
        bg-transparent
        px-6
        py-3
        sm:w-auto
        sm:min-w-[10rem]
        sm:px-10
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