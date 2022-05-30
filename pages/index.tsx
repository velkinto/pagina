import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NET面板</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Link href='/new'>添加应用</Link>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
      </footer> */}
    </div>
  )
}

export default Home
