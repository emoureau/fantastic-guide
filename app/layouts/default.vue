<template>
  <div class="bg-default text-default min-h-screen flex flex-col">
    <UHeader title="Clippings" to="/">
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain class="flex-1">
      <slot />
    </UMain>
  </div>
</template>
