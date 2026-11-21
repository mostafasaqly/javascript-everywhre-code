import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { readTasks } from './store.js'

function toCsvLine({ id, title, status }) {
  return `${id},${JSON.stringify(title)},${status}\n`
}

export async function exportCsv(file) {
  const tasks = await readTasks()
  const header = 'id,title,status\n'
  const rows = tasks.map(toCsvLine)
  const lines = Readable.from([header, ...rows])
  await pipeline(lines, createWriteStream(file))
}
