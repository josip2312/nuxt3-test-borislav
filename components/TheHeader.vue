<script setup lang="ts"></script>

<template>
  <header class="py-6 shadow-md">
    <div class="flex container mx-auto justify-between">
      <NuxtLink :to="{ name: 'index' }">App</NuxtLink>

      <ul class="flex gap-8 items-center">
        <li>
          <NuxtLink :to="{ name: 'index' }">Home page</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'other-page' }">Other page</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
