import Image from 'next/image'
import sanityClient from '/client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import Form from '../../components/Form'
import Comment from '../../components/Comment'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value)}
          className="my-5 mx-auto"
        />
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mb-9 text-2xl text-neutral-600 md:text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="my-5 text-xl font-bold text-neutral-600">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="max-w-7xl text-lg leading-loose text-neutral-600 md:text-xl">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-xl text-neutral-600">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-xl list-disc text-neutral-600">{children}</ul>
    ),
  },
}
export default function Post({ post }) {
  console.log(post.comment)
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center">
      <div className="relative h-40 w-4/5 md:h-[32rem] md:w-10/12">
        <Image
          src={post.mainImage ? urlFor(post.mainImage).url() : '/post.svg'}
          alt=""
          // width={1000}
          // height={600}
          layout="fill"
          objectFit="contain"
          className="border-4 border-orange-700"
        />
      </div>
      <div className="mb-24 mt-12 flex h-[8rem] w-10/12 flex-col items-center justify-between text-gray-500">
        <h2 className="text-xl tracking-widest text-[#E21DA9]">{post.name}</h2>
        <h1 className=" font-serif text-4xl ">{post.title}</h1>
        <h2 className="tracking-widest">
          {new Date(post._createdAt).toUTCString()}
        </h2>
      </div>
      <div className="mx-auto w-full content-center border-x-2 border-gray-300 px-2 md:px-16">
        <PortableText value={post.body} components={ptComponents} />
      </div>
      <div className="mx-auto w-full items-center">
        <Form _id={post._id} className="content-center" />
      </div>
      <div className="w-11/12 max-w-4xl  border p-5 shadow-md md:w-7/12">
        <h2 className="mb-5 tracking-wide">Comments</h2>
        {post.comment.map((comment) => (
          <Comment
            name={comment.name}
            key={comment._id}
            date={new Date(comment._createdAt).toUTCString()}
            comment={comment.text}
          />
        ))}
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const posts = await sanityClient.fetch(
    `*[_type == "post"]{_id, slug{current}}`
  )
  const paths = posts.map((post) => ({
    params: { slug: post.slug.current },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps = async (context) => {
  const slug = context.params?.slug

  const query = `*[_type == "post" && slug.current == $slug][0]{_id,title, body, mainImage,"name": author->name, _createdAt,'comment':*[_type=='comment' && post._ref ==^._id]{name,text,_createdAt}}`
  const post = await sanityClient.fetch(query, { slug })
  if (!post) {
    return { notFound: true }
  }
  return {
    props: { post },
  }
}
