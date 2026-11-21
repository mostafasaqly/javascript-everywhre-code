import { formatTask } from './format.js'
import { addTask, readTasks, removeTask, updateTask } from './store.js'
import './listerners.js'
import { exportCsv } from './export.js'
const [command, ...args] = process.argv.slice(2)

function fail(message) {
    console.error(message)
    process.exit(1)
}
switch (command) {
    case 'list': {
        const tasks = await readTasks()
        tasks.forEach((task) => console.log(formatTask(task)))
        break
    }
    case 'add': {
        const title = args.join(' ')
        if (!title) fail('Usage: node src/cli.js add <title>')
        console.log('Added:', formatTask(await addTask({ title })))
        break
    }
    case 'done': {
        const id = Number(args[0])
        const task = await updateTask(id, { status: 'done' })
        if (!task) fail(`Task ${args[0]} not found`)
        console.log('Done:', formatTask(task))
        break
    }
    case 'remove': {
        const id = Number(args[0])
        if (!(await removeTask(id))) fail(`Task ${args[0]} not found`)
        console.log(`Removed task ${id}`)
        break
    }
    case 'export': {
        const file = args[0] ?? tasks.exportCsv
        await exportCsv(file)
        console.log(`Exported to ${file}`)
        break
    }
    default:
        console.log('Usage: node src/cli.js <list|add|done|remove|export>')
}