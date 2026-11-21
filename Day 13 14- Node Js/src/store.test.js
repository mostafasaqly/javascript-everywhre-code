import assert from 'node:assert/strict'
import { mkdtemp, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { before, describe, it } from 'node:test'

describe('store', () => {
  let store

  before(async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), 'taskflow-'))
    const file = path.join(dir, 'tasks.json')
    await writeFile(file, '[]')
    process.env.DATA_FILE = file
    store = await import('../src/store.js')
  })

  it('adds a task with the next id', async () => {
    const task = await store.addTask({ title: 'Test' })
    assert.equal(task.id, 1)
    assert.equal(task.status, 'todo')
  })

  it('updates a task', async () => {
    const task = await store.updateTask(1, { status: 'done' })
    assert.equal(task.status, 'done')
  })

  it('removes a task and returns false for a missing one', async () => {
    assert.equal(await store.removeTask(1), true)
    assert.equal(await store.removeTask(99), false)
    assert.deepEqual(await store.readTasks(), [])
  })
})
