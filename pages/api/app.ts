import type { NextApiRequest, NextApiResponse } from 'next'
import { execSync } from 'child_process'
import fs from 'fs/promises'
import getDirectories from '../util/directory'

const DOMAIN = 'xleox.cn'
const USER = 'leo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // 运行脚本
    console.log('Received.')
    /* 1. git仓库和文件目录 2. nginx配置*/
    res.redirect('/')
    // res.status(200).json({ name: 'John Doe' })
    // 处理报错暂时还没做
    const name = 'demo'
    const dirs = getDirectories(name, DOMAIN)
    await fs.mkdir(dirs.src, { recursive: true })
    execSync(`git init ${name}.git --bare`, { cwd: dirs.base })
    await fs.writeFile(
      dirs.hook,
      `#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo 'server: received code push...'
cd ${dirs.src}
echo 'server: checkout latest code from git...'
git --git-dir=${dirs.git} --work-tree=${dirs.src} checkout main -f
echo 'server: building pages...'
pnpm install \
&& npm run build \
&& echo 'server: done.'
mv ${dirs.dist} ${dirs.html}

echo 'git remote add prod ssh://${USER}@${DOMAIN}${dirs.git}'
`
    )
    await fs.writeFile(
      dirs.nginx,
      `server {
  listen 443 ssl;
  server_name ${dirs.domain};

  root ${dirs.html};

  ssl_certificate https/${dirs.domain}.crt;
  ssl_certificate_key https/${dirs.domain}.key;

  index index.html;
}
`
    )
    execSync(`chmod +x ${dirs.hook}`, { cwd: dirs.base })
    console.log(`git remote add prod ssh://${USER}@${DOMAIN}${dirs.git}`)
  } else {
    // Handle any other HTTP method
  }
}
