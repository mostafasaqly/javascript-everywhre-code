<script setup lang="ts">
import type { Task } from '../types';
import { formatDueDate, statusLabel } from '../utils/format';
const props = withDefaults(defineProps<{ task: Task; compact?: boolean, selected: boolean }>(),
  { compact: false, selected: false })

const emit = defineEmits<{ 
  select: [id: number]
  toggle:[id:number]
  delete: [id:number]
  edit : [id:number] 
}>()
function handleClick(): void {
  emit('select', props.task.id)
}
</script>

<template>
  <article 
  class="task-card" 
  :class="
  { 'task-card--compact': compact, 
    'task-card--selected': selected ,
    'task-card--done':task.status === 'done'
  }" 
  @click="handleClick">
    <h3 class="task-card__title">{{ task.title }}</h3>
    <p v-if="!compact" class="task-card__meta">{{ formatDueDate(task.dueDate) }}</p>
    <div class="task-card__footer">
      <span class="task-card__status">{{ statusLabel(task.status) }}</span>
      <div class="task-card__actions">
        <button type="button" class="task-card__action" @click.stop="emit('toggle', task.id)">
          {{ task.status === 'done' ? 'Undo' : 'Done' }}
        </button>
        <button type="button" class="task-card__action" @click.stop="emit('edit', task.id)">
          Edit
        </button>
        <button type="button" class="task-card__action" @click.stop="emit('delete', task.id)">
          Delete
        </button>
      </div>
    </div>
  </article>
</template>
