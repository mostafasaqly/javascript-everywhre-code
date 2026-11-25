import http from 'node:http'
import { readTasks, addTask} from './store.js'
import {config} from './config.js'
function sendJson(res, status, data)
{
    res.writeHead(status, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(data))
}
async function readBody(req)
{
    let text = ''
    for await (const chunk of req) text+=chunk
    return text ? JSON.parse(text): {}
}
const server = http.createServer(async (req, res)=> {
    const url = new URL(req.url, 'http://localhost')
    const parts = url.pathname.split('/').filter(Boolean)

    if(parts[0] !== 'tasks') return sendJson(res, 404, {error: 'Not Found'})
    if(req.method === 'GET' && parts.length === 1)
    {
        return sendJson(res, 200, await readTasks())
    }

    if(req.method === 'GET' && parts.length === 2)
    {
        const tasks = await readTasks()
        const task = tasks.find((item)=> item.id  === Number(parts[1]))
        return task ? sendJson(res,200,task) : sendJson(res, 404, {error: 'Task Not Found'})
    }

    if(req.method === 'POST' && parts.length === 1)
    {
        let body
        try { body = await readBody(req) }
        catch { return sendJson(res, 400, {error: 'Invalid JSON body'}) }
        if(!body.title) return sendJson(res, 400, {error: 'title is required'})
        return sendJson(res, 201, await addTask(body))
    }

    sendJson(res, 405, {error : 'Method not allowed'})


    
})

server.listen(config.port, ()=>{
    console.log(`Server runing on http://localhost:${config.port}`)
})

// cmd.exe (Windows) - single quotes don't work, escape the double quotes:
// curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"From curl\"}" http://localhost:3000/tasks

