<template>
    <section class="task-section">
        <header class="task-section__header">
            <slot name="header">
                <h2>Tasks</h2>
            </slot>
        </header>
        <div class="task-section__body">
            <slot></slot>
        </div>
    </section>
</template>