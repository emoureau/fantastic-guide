<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

useSeoMeta({ title: 'New clipping' })

const route = useRoute()
const toast = useToast()

function param(key: string) {
  const value = route.query[key]
  return typeof value === 'string' ? value : ''
}

const state = reactive<ClippingInput>({
  url: param('url'),
  title: param('title'),
  site: param('site'),
  author: param('author'),
  publishedAt: param('publishedAt'),
  description: param('description'),
  image: param('image'),
  quote: param('quote'),
  notes: '',
  tags: [],
})

const saved = ref(false)
const saving = ref(false)

function validate(s: Partial<ClippingInput>): FormError[] {
  const errors: FormError[] = []
  if (!s.url)
    errors.push({ name: 'url', message: 'Required' })
  if (!s.title)
    errors.push({ name: 'title', message: 'Required' })
  return errors
}

async function onSubmit() {
  saving.value = true
  try {
    await $fetch('/api/clippings', { method: 'POST', body: state })
    saved.value = true
  }
  catch {
    toast.add({ title: 'Could not save the clipping', color: 'error' })
  }
  finally {
    saving.value = false
  }
}

function closeWindow() {
  window.close()
}
</script>

<template>
  <UContainer class="py-8 max-w-2xl">
    <div v-if="saved" class="py-16 text-center">
      <UIcon name="i-lucide-circle-check" class="size-12 text-success" />
      <h1 class="mt-4 text-2xl font-bold text-highlighted">
        Clipping saved
      </h1>
      <div class="mt-6 flex justify-center gap-2">
        <UButton label="Close window" @click="closeWindow" />
        <UButton
          label="View clippings"
          to="/"
          color="neutral"
          variant="subtle"
        />
      </div>
    </div>

    <template v-else>
      <h1 class="text-2xl font-bold tracking-tight text-highlighted">
        New clipping
      </h1>

      <UForm
        :state="state"
        :validate="validate"
        class="mt-6 space-y-4"
        @submit="onSubmit"
      >
        <img
          v-if="state.image"
          :src="state.image"
          alt=""
          class="aspect-video w-full rounded-lg object-cover"
        >

        <UFormField name="title" label="Headline" required>
          <UInput v-model="state.title" class="w-full" />
        </UFormField>

        <UFormField name="url" label="URL" required>
          <UInput v-model="state.url" type="url" class="w-full" />
        </UFormField>

        <div class="grid grid-cols-3 gap-4">
          <UFormField name="site" label="Publication">
            <UInput v-model="state.site" class="w-full" />
          </UFormField>
          <UFormField name="author" label="Author">
            <UInput v-model="state.author" class="w-full" />
          </UFormField>
          <UFormField name="publishedAt" label="Published">
            <UInput v-model="state.publishedAt" class="w-full" />
          </UFormField>
        </div>

        <UFormField name="description" label="Summary">
          <UTextarea
            v-model="state.description"
            :rows="3"
            autoresize
            class="w-full"
          />
        </UFormField>

        <UFormField name="quote" label="Quote" description="Text you had selected on the page.">
          <UTextarea
            v-model="state.quote"
            :rows="2"
            autoresize
            class="w-full"
          />
        </UFormField>

        <UFormField name="tags" label="Tags">
          <UInputTags v-model="state.tags" placeholder="Add a tag…" class="w-full" />
        </UFormField>

        <UFormField name="notes" label="Notes">
          <UTextarea
            v-model="state.notes"
            :rows="3"
            autoresize
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" label="Save clipping" :loading="saving" />
      </UForm>
    </template>
  </UContainer>
</template>
