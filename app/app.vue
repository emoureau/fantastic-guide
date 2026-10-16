<script setup lang="ts">
useHead({
  titleTemplate: title => (title ? `${title} · Clippings` : 'Clippings'),
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
