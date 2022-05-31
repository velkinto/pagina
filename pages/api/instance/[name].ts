import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import getDirectories from '../../util/directory'

const DOMAIN = 'xleox.cn'

export default async function instanceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { name },
    method,
  } = req

  switch (method) {
    case 'DELETE':
      // Get data from your database
      // res.status(200).json({ id, name: `User ${id}` })
      console.log('删除' + name)
      const { base, nginx } = getDirectories(name as string, DOMAIN)
      fs.rmSync(base, { recursive: true, force: true })
      // nginx 删除
      fs.rmSync(nginx, { recursive: true, force: true })
      res.status(200).json({ ok: true })
      break
    // case 'PUT':
    // Update or create data in your database
    // res.status(200).json({ id, name: name || `User ${id}` })
    // break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
