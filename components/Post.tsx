import Image from 'next/image'
import Link from 'next/link'
export default function Post(props: any) {
  function setColor(category: any) {
    switch (category) {
      case 'IT':
        return 'text-orange-500'
      case 'TV Show':
        return 'text-purple-500'
    }
  }
  return (
    <div
      className="
     mb-4 grid grid-rows-2 justify-center gap-y-2 md:grid-cols-[18rem_1fr] md:gap-x-2"
    >
      <div className="relative mr-5 overflow-hidden rounded shadow-[2px_2px_5px_#2e2e2e83]">
        <Image src={props.image} alt="" layout="fill" />
      </div>
      <div className="max-w-lg text-gray-700">
        <p className={`${setColor(props.category)} font-mono text-sm`}>
          {props.category}
        </p>
        <h1 className="py-1 text-2xl">{props.title}</h1>
        <p className="font-light">
          {props.description}
          <Link href={`/post/${props.slug}`}>
            <span className="ml-1 text-red-300 hover:cursor-pointer">
              {' '}
              Read More...
            </span>
          </Link>
        </p>
        <p className="mt-8">
          By{' '}
          <span className="font-semibold tracking-wide text-stone-500">
            {props.author}
          </span>
        </p>
      </div>
    </div>
  )
}
