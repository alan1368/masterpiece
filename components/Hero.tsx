export default function Hero() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-evenly border-y-2 border-gray-200 bg-green-100 p-5">
      <div className="hidden sm:hidden md:inline-flex">
        <img src="/note.svg" alt="note" className="" />
      </div>
      <div className="mb-12 flex flex-col gap-y-3 font-serif text-gray-500">
        <h1 className="text-5xl">
          Write Your{' '}
          <span className="underline underline-offset-4">
            Master<span className="text-green-600">Piece</span>
          </span>
        </h1>
        <h2 className="text-2xl">
          A powerful platform to writing and publishing
        </h2>
        <h2 className="text-2xl">Your Masterpiece</h2>
      </div>
    </div>
  )
}
