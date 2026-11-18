export const APP_NAME="TaskFlow API"

export function formatTask(task)
{
    const mark = task.status === 'done' ? '[x]' : '[ ]'
    return `${mark} #${task.id} ${task.title}`
}