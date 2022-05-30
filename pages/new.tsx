import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const New: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>添加应用 | NET面板</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <form action="/api/app" method="post">
          <button type="submit">提交</button>
        </form>
        <Link href="/">取消</Link>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
      </footer> */}
    </div>
  )
}

export default New
