<script setup lang="ts">
import type {Project} from '../types'

const projects:Project[] = [
  {id: 1, name:'Website Redesign'},
  { id: 2, name: 'Mobile app' },
  { id: 3, name: 'Marketing' },
]
</script>

<template>
  <aside class="app-sidebar">
    <h2 class="app-sidebar__title">Projects</h2>
    <ul class="app-sidebar__list">
      <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
    </ul>
  </aside>
</template>
