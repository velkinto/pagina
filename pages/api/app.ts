// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { execSync } from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import { homedir } from 'os'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // 运行脚本
    console.log('Received.')
    /* 1. git仓库和文件目录 2. nginx配置*/
    res.redirect('/')
    // res.status(200).json({ name: 'John Doe' })
    // 处理报错暂时还没做
    const name = 'demo'
    const domain = 'xleox.cn'
    const fullDomain = `${name}.${domain}`
    const baseDir = path.join(homedir(), 'pagina', name)
    const srcDir = path.join(baseDir, 'src')
    const distDir = path.join(srcDir, 'dist')
    const htmlDir = path.join(baseDir, 'html')
    const gitDir = path.join(baseDir, `${name}.git`)
    const hookFile = path.join(gitDir, 'hooks', 'post-receive')
    const nginxProfile = path.join('/etc/nginx/conf.d', `${fullDomain}.conf`)
    await fs.mkdir(srcDir, { recursive: true })
    execSync(`git init ${name}.git --bare`, { cwd: baseDir })
    await fs.writeFile(
      hookFile,
      `#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

echo 'server: received code push...'
cd ${srcDir}
echo 'server: checkout latest code from git...'
git --git-dir=${gitDir} --work-tree=${srcDir} checkout main -f
echo 'server: building pages...'
pnpm install \
&& npm run build \
&& echo 'server: done.'
mv ${distDir} ${htmlDir}

echo 'git remote add prod ssh://leo@${domain}${gitDir}'
`
    )
    await fs.writeFile(
      nginxProfile,
      `server {
  listen 443 ssl;
  server_name ${fullDomain};

  root ${htmlDir};

  ssl_certificate https/${fullDomain}.crt;
  ssl_certificate_key https/${fullDomain}.key;

  index index.html;
}
`
    )
    execSync(`chmod +x ${hookFile}`, { cwd: baseDir })
    console.log(`git remote add prod ssh://leo@${domain}${gitDir}`)
  } else {
    // Handle any other HTTP method
  }
}
