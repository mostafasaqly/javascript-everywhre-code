import assert from 'node:assert/strict'
import { mkdtemp, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { after, before, describe, it } from 'node:test'

describe('TaskFlow API', () => {
  let server
  let base
  let token

  before(async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), 'taskflow-api-'))
    await writeFile(path.join(dir, 'tasks.json'), '[]')
    await writeFile(path.join(dir, 'projects.json'), '[{"id":1,"name":"Test"}]')
    process.env.DATA_FILE = path.join(dir, 'tasks.json')
    const { default: app } = await import('../src/app.js')
    server = app.listen(0)
    base = `http://localhost:${server.address().port}/api`

    const login = await fetch(`${base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'mostafa', password: 'taskflow123' }),
    })
    token = (await login.json()).token
  })

  after(() => server.close())

  const post = (body, auth = true) =>
    fetch(`${base}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(auth && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify(body),
    })

  it('lists tasks', async () => {
    const response = await fetch(`${base}/tasks`)
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), [])
  })

  it('rejects a create without a token', async () => {
    assert.equal((await post({ title: 'No token' }, false)).status, 401)
  })

  it('creates a task with a token', async () => {
    const response = await post({ title: 'Write tests' })
    assert.equal(response.status, 201)
    assert.equal((await response.json()).title, 'Write tests')
  })

  it('rejects an invalid task', async () => {
    const response = await post({ title: 'a' })
    assert.equal(response.status, 400)
    assert.equal((await response.json()).errors.length, 1)
  })

  it('returns 404 for an unknown route', async () => {
    assert.equal((await fetch(`${base}/nothing`)).status, 404)
  })
})
