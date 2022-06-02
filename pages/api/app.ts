import type { NextApiRequest, NextApiResponse } from 'next'
import { execSync } from 'child_process'
import fs from 'fs/promises'
import getDirectories from '../util/directory'
import templates from '../util/templates'

const DOMAIN = 'xleox.cn'
const USER = 'leo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    res.redirect('/')
    // 处理报错暂时还没做
    const name = 'demo'
    const dirs = getDirectories(name, DOMAIN)
    await fs.mkdir(dirs.src, { recursive: true })
    execSync(`git init ${name}.git --bare`, { cwd: dirs.base })
    await fs.writeFile(dirs.hook, templates.hook.spa(dirs))
    await fs.writeFile(dirs.nginx, templates.nginx.normal(dirs))
    execSync(`chmod +x ${dirs.hook}`, { cwd: dirs.base })
    console.log(`git remote add prod ssh://${USER}@${DOMAIN}${dirs.git}`)
  } else {
    // Handle any other HTTP method
  }
}
