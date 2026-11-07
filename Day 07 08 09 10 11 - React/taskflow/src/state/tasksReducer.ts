import type { Task } from "../types/task";
export interface TasksState {
  tasks: Task[];
  status : 'loading' | 'ready' | 'error';
  error: string | null;
}
export type TasksAction = 
| { type: 'load_start' }
| { type: 'load_success'; tasks: Task[] }
| { type: 'load_error'; error: string }
| { type: 'action_error'; error: string }
| { type: 'added'; task: Task }
| { type: 'updated'; task: Task } 
| { type: 'deleted'; ids: number[] }; 

export const initialTaskState: TasksState = {
    tasks: [],  
    status: 'loading',
    error: null
};

export function tasksReducer(state: TasksState, action: TasksAction): TasksState {
    switch (action.type) {
        case 'load_start':
            return { ...state, status: 'loading', error: null };
        case 'load_success':
            return { ...state, status: 'ready', tasks: action.tasks, error: null };
        case 'load_error':
            return { ...state, status: 'error', error: action.error };
        case 'action_error':
            return { ...state, error: action.error };
        case 'added':
            return { ...state, tasks: [...state.tasks, action.task], error: null };
        case 'updated':
            return {
                ...state,
                tasks: state.tasks.map((t) => (t.id === action.task.id ? action.task : t)),
                error: null
            };
        case 'deleted':
            return {
                ...state,
                tasks: state.tasks.filter((t) => !action.ids.includes(t.id)),
                error: null
            };
        default:
            return state;
    }
}