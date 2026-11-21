import chalk from 'chalk'
export const APP_NAME="TaskFlow API"

export function formatTask(task)
{
    const done = task.status === 'done'
    const color = done ? chalk.green : chalk.yellow
    const mark = color(done ? '[x]': '[ ]') 
    const title = done ? chalk.dim(task.title) : task.title
    return `${mark} #${task.id} ${title}`
}