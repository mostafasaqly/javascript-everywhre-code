<script setup lang="ts">
import {reactive ,computed, ref} from 'vue'
import type {TaskFormValues} from '../types'

const props =defineProps<{initial? : TaskFormValues}>()
const emit = defineEmits<{submit : [values : TaskFormValues]; cancel:[]}>()
const isEditing = computed(()=> props.initial !== undefined)

const values = reactive<TaskFormValues>({
    title:'',
  description: '',
  status: 'todo',
  dueDate: '',
  ...props.initial
})

const submitted = ref(false)

const errors = computed(() => {
  const result: { title?: string } = {}
  if (values.title.trim().length < 3) result.title = 'Title needs at least 3 characters'
  return result
})
function resetForm(): void {
  values.title = ''
  values.description = ''
  values.status = 'todo'
  values.dueDate = ''
  submitted.value = false
}

function handleSubmit():void{
  submitted.value = true
  if(errors.value.title) return
  emit('submit', {...values})
  resetForm()
}
</script>
<template>
    <form class="task-form" @submit.prevent="handleSubmit">
    <label class="form-field">
      <span>Title</span>
      <input v-model="values.title" placeholder="What needs to be done?" />
      <span v-if="submitted && errors.title" class="form-error" role="alert">{{ errors.title }}</span>
    </label>
    <label class="form-field">
      <span>Description</span>
      <textarea v-model="values.description" rows="2"></textarea>
    </label>
    <label class="form-field">
      <span>Status</span>
      <select v-model="values.status">
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </label>
    <label class="form-field">
      <span>Due date</span>
      <input v-model="values.dueDate" type="date" />
    </label>
    <button type="submit" class="task-form__submit">
      {{ isEditing ? 'Save Changes' : 'Add Task' }}
    </button>
    <button v-if="isEditing" type="button" class="task-form__cancel" @click="emit('cancel')">
      Cancel
    </button>
  </form>
</template>