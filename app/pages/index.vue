<script setup lang="ts">
useSeoMeta({ title: 'News clippings' })

const toast = useToast()
const bookmarklet = buildBookmarklet(useRequestURL().origin)
const { data: clippings } = await useFetch('/api/clippings', { default: () => [] })

function onBookmarkletClick() {
  toast.add({
    title: 'Drag it, don\'t click it',
    description: 'Drag the button onto your bookmarks bar, then click the bookmark while reading an article.',
    color: 'warning',
    icon: 'i-lucide-hand',
  })
}
</script>

<template>
  <UContainer class="py-10 max-w-3xl">
    <h1 class="text-3xl font-bold tracking-tight text-highlighted">
      News clippings
    </h1>

    <div class="mt-6 rounded-lg border border-default bg-elevated p-6">
      <h2 class="font-semibold text-highlighted">
        Install the clipper
      </h2>
      <ol class="mt-2 list-decimal pl-5 text-sm text-toned space-y-1">
        <li>Show your bookmarks bar (<UKbd value="ctrl" /> <UKbd value="shift" /> <UKbd value="B" />).</li>
        <li>Drag the button below onto it.</li>
        <li>On any news article, click the bookmark. Select a passage first to save it as a quote.</li>
      </ol>

      <!-- Plain <a>: the href must stay a raw javascript: URL so it can be dragged. -->
      <a
        :href="bookmarklet"
        data-testid="bookmarklet"
        class="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-inverted cursor-grab active:cursor-grabbing"
        @click.prevent="onBookmarkletClick"
      >
        <UIcon name="i-lucide-scissors" class="size-4" />
        Clip to Clippings
      </a>
    </div>

    <h2 class="mt-10 text-xl font-semibold text-highlighted">
      Saved ({{ clippings.length }})
    </h2>

    <p v-if="!clippings.length" class="mt-2 text-sm text-muted">
      Nothing yet. Clip an article to see it here.
    </p>

    <ul v-else class="mt-4 space-y-4">
      <li v-for="clip in clippings" :key="clip.id">
        <UCard>
          <div class="flex gap-4">
            <img
              v-if="clip.image"
              :src="clip.image"
              alt=""
              class="size-20 shrink-0 rounded object-cover"
            >
            <div class="min-w-0">
              <ULink :to="clip.url" target="_blank" class="font-semibold text-highlighted hover:text-primary">
                {{ clip.title }}
              </ULink>
              <p class="mt-1 text-xs text-muted">
                {{ [clip.site, clip.author, clip.publishedAt.slice(0, 10)].filter(Boolean).join(' · ') }}
              </p>
              <blockquote v-if="clip.quote" class="mt-2 border-l-2 border-primary pl-3 text-sm italic text-toned">
                {{ clip.quote }}
              </blockquote>
              <p v-if="clip.notes" class="mt-2 text-sm">
                {{ clip.notes }}
              </p>
              <div v-if="clip.tags.length" class="mt-2 flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in clip.tags"
                  :key="tag"
                  :label="tag"
                  color="neutral"
                  variant="subtle"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </UCard>
      </li>
    </ul>
  </UContainer>
</template>
