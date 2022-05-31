import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import getInstances, { Instance } from './util/instances'
// import Image from 'next/image'

const Home: NextPage<{
  instances: Instance[]
}> = ({ instances }) => {
  const deleteInstance = React.useCallback((name: string) => {
    fetch('/api/instance/' + name, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(({ ok }) => (ok ? location.reload() : console.log('失败')))
  }, [])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NET面板</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {instances.map(({ name }) => (
          <div key={name}>
            {name}
            <button onClick={() => deleteInstance(name)}>删除</button>
          </div>
        ))}
        <Link href="/new">添加应用</Link>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
      </footer> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      instances: getInstances(),
    },
  }
}

export default Home
