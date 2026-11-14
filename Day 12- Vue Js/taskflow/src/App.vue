<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, useTemplateRef , watch , watchEffect} from 'vue'
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import TaskCard  from './components/TaskCard.vue';
import TaskSection from './components/TaskSection.vue';
import TaskForm from './components/TaskForm.vue';
import type {Task, TaskFormValues , TaskStatus} from './types.ts'
import { useTasks } from './composables/useTasks.ts';
import { findById } from './utils/collections.ts';
const {tasks, remaining, counts, addTask, updateTask, toggleTask, deleteTask } = useTasks()

const selectedId = ref<number | null>(null)
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')

const search= ref('')
const statusFilter = ref<TaskStatus | 'all'>('all')
const editingId = ref<number | null>(null) 

const visibleTasks = computed(() =>
  tasks.value.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || task.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
)

const summry = computed(()=>remaining.value + ' of ' + tasks.value.length + ' tasks left')

const editingTask = computed(()=>{
  return editingId.value === null ? undefined : findById(tasks.value, editingId.value)
})
const editingValues = computed<TaskFormValues | undefined>(() => {
  const task = editingTask.value
  if (!task) return undefined
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate ?? '',
  }
})

function onSelect(id:number):void
{
  selectedId.value = id
}

function saveTask(values: TaskFormValues): void {
  if (editingId.value === null) {
    addTask(values)
    return
  }
  updateTask(editingId.value, values)
  editingId.value = null
}
function removeTask(id :number)
{
  deleteTask(id)
  if(selectedId.value === id) selectedId.value = null
}


watchEffect(() => {
  document.title = remaining.value + ' tasks left | TaskFlow'
})
watch(statusFilter, () => {
  selectedId.value = null
})
function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') editingId.value = null
  if (event.key === '/' && document.activeElement !== searchInput.value) {
    event.preventDefault()
    searchInput.value?.focus()
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="app">
    <AppHeader/>
    <div class="app__body">
      <AppSidebar/>
      <main class="app__main">
        <TaskForm 
        :key="editingId ?? 'new'"
        :initial="editingValues"
        @submit="saveTask"
        @cancel="editingId = null"
        />


        <div class="filters">
          <input 
          ref="searchInput"
          v-model="search" 
          type="search" 
          placeholder="Search tasks" />
          <select v-model="statusFilter">
            <option value="all">All</option>
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>



        <TaskSection>
          <template #header>
            <h2>Website Redesign</h2>
            <p class="summary">{{ summry }}</p>
            <p class="summary">
              To do {{ counts.todo }} - In Progress {{ counts.inProgress }} - Done {{ counts.done }}
            </p>
          </template>
          <p v-if="visibleTasks.length === 0" class="empty"> No Tasks Yet..</p>
          <p v-show="selectedId!== null" class="hint"> Task {{ selectedId }} is Selected</p>
          <TaskCard 
          v-for="task in visibleTasks"
          :key="task.id"
          :task="task"
          :selected="task.id === selectedId"
          @select="onSelect"
          @toggle="toggleTask"
          @delete="removeTask"
          @edit ="editingId = $event"
          />
        </TaskSection>
      </main>
    </div>
  </div>
</template>