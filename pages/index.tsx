import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '../components/Hero'
import client from '../lib/client.js'
import Post from '../components/Post'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

const Home: NextPage = ({ posts }: any) => {
  return (
    <>
      <Head>
        <title>MasterPiece</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <div className="mx-auto mt-5 flex w-11/12 max-w-7xl flex-col items-start">
        {posts.map((post: any) => {
          return (
            <Post
              title={post.title}
              category={post.category}
              image={
                post.mainImage ? urlFor(post.mainImage).url() : '/post.svg'
              }
              slug={post.slug.current}
              author={post.name}
              description={post.description}
            />
          )
        })}
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const posts = await client.fetch(
    '*[_type == "post"]{title, body, mainImage, slug,"name": author->name, description, "category":categories[0]->title}'
  )
  return {
    props: { posts },
  }
}
