import fs from 'fs'
import os from 'os'
import path from 'path'

export type Instance = {
  name: string
}

// const instances: Instance[] = []

const getInstances: () => Instance[] = () => {
  const base = path.join(os.homedir(), 'pagina')
  return fs.readdirSync(base).map((name) => ({ name }))
}

export default getInstances
