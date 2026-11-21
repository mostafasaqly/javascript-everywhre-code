import { taskEvents } from "./events.js";

taskEvents.on('task:created', (task)=>{
    console.log(`[event] created #${task.id}`)
})

taskEvents.on('task:removed', (id)=>{
    console.log(`[event] removed #${id}`)
})