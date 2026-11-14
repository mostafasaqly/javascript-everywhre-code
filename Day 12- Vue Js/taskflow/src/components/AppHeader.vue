<script setup lang="ts">
import { APP_NAME, APP_VERSION } from '../contastants';
</script>

<template>
    <header class="app-header">
        <h1 class="app-header_title">{{ APP_NAME }}</h1>
        <span class="app-header_version">{{ APP_VERSION }}</span>
    </header>
</template>