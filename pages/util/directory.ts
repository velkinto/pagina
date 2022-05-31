import path from 'path'
import { homedir } from 'os'

export type Dirs = {
  domain: string
  base: string
  src: string
  dist: string
  html: string
  git: string
  hook: string
  nginx: string
}

const NGINX_CONFIG_DIR = '/etc/nginx/conf.d'

const getDirectories: (name: string, domain: string) => Dirs = (
  name,
  domain
) => {
  const dirs: any = {}
  dirs.domain = `${name}.${domain}`
  dirs.base = path.join(homedir(), 'pagina', name)
  dirs.src = path.join(dirs.base, 'src')
  dirs.html = path.join(dirs.base, 'html')
  dirs.git = path.join(dirs.base, `${name}.git`)
  dirs.dist = path.join(dirs.src, 'dist')
  dirs.hook = path.join(dirs.git, 'hooks', 'post-receive')
  dirs.nginx = path.join(NGINX_CONFIG_DIR, `${dirs.domain}.conf`)
  return dirs as Dirs
}

export default getDirectories
