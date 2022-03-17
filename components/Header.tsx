import Link from 'next/link'
export default function Header() {
  return (
    <header className=" mx-auto flex max-w-7xl items-center justify-between p-5 ">
      <Link href="/">
        <div className="flex items-center hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
            color="green"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <h2 className="font-serif text-2xl text-gray-500 hover:text-green-600">
            MasterPieace
          </h2>
        </div>
      </Link>
      <div className="flex items-center space-x-4 text-green-600">
        <Link href="">
          <h3 className="hover:cursor-pointer">Sign in</h3>
        </Link>
        <Link href="">
          <h3 className="rounded-full border border-green-600 px-4 py-1 hover:cursor-pointer hover:bg-green-600 hover:text-white">
            Get Started
          </h3>
        </Link>
      </div>
    </header>
  )
}
