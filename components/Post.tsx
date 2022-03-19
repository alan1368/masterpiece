import Image from 'next/image'
import Link from 'next/link'
export default function Post(props) {
  return (
    <div
      className="
     mb-8 grid grid-cols-[18rem_1fr] justify-center gap-x-2"
    >
      <div className="relative mr-5 overflow-hidden rounded shadow-[2px_2px_5px_#2e2e2e83]">
        <Image src={props.image} alt="" layout="fill" />
      </div>
      <div className="w-96 text-gray-700">
        <p className={props.color}>{props.category}</p>
        <h1 className="py-1 text-3xl">{props.title}</h1>
        <p className="font-light">
          {props.description}
          <Link href={`/post/${props.slug}`}>
            <span className="ml-1 text-red-300 hover:cursor-pointer">
              {' '}
              Read More
            </span>
          </Link>
        </p>
        <p className="mt-8">
          By <span className="font-bold">{props.author}</span>
        </p>
      </div>
    </div>
  )
}
