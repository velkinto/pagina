import { Dirs } from './directory'

const hook = {
  spa: (dirs: Dirs) =>
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
`,
}

const nginx = {
  normal: (dirs: Dirs) =>
    `server {
  listen 443 ssl;
  server_name ${dirs.domain};

  root ${dirs.html};

  ssl_certificate https/${dirs.domain}.crt;
  ssl_certificate_key https/${dirs.domain}.key;

  index index.html;
}
`,
}

export default {
  nginx,
  hook,
}
