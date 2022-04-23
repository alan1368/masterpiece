import { GetStaticPaths, GetStaticProps } from 'next'

import Image from 'next/image'
import client from '../../lib/client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import Form from '../../components/Form'
import Comment from '../../components/Comment'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
const ptComponents = {
  types: {
    image: ({ value }: any) => {
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
    h1: ({ children }: any) => (
      <h1 className="mb-9 text-2xl text-neutral-600 md:text-4xl">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="my-5 text-xl font-bold text-neutral-600">{children}</h2>
    ),
    normal: ({ children }: any) => (
      <p className="max-w-7xl text-xl leading-loose text-neutral-600">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="text-xl text-neutral-600">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mt-xl list-disc text-neutral-600">{children}</ul>
    ),
  },
}
export default function Post({ post }: any) {
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
      <div className="w-10/12 border-x-2 border-gray-300 px-2 md:px-16">
        <PortableText value={post.body} components={ptComponents} />
      </div>
      <Form _id={post._id} />
      <div className="w-7/12  max-w-4xl border p-5 shadow-md">
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.fetch(`*[_type == "post"]{_id, slug{current}}`)
  const paths = posts.map((post: any) => ({
    params: { slug: post.slug.current },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params?

  const query = `*[_type == "post" && slug.current == $slug][0]{_id,title, body, mainImage,"name": author->name, _createdAt,'comment':*[_type=='comment' && post._ref ==^._id]{name,text,_createdAt}}`
  const post = await client.fetch(query, { slug })
  if (!post) {
    return { notFound: true }
  }
  return {
    props: { post },
  }
}
