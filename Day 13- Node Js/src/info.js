import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(`Platform :- ${os.platform()}`)
console.log(`CPUs : ${os.cpus().length}`)
console.log(`This File : ${path.basename(__filename)}`)
console.log(`Data File : ${path.join(__dirname, "..", 'data', 'tasks.json')}`)
console.log(`Aruments : ${process.argv.slice(2)}`)
console.log(`PORT from env : ${process.env.PORT ?? '(not set)'}`)