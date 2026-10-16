export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      secondary: 'brand',
      success: 'success',
      warning: 'warning',
      error: 'error',
      neutral: 'ink',
    },
    alert: {
      slots: {
        title: 'text-sm font-medium text-highlighted!',
        description: 'text-sm opacity-75 text-default!',
      },
    },
  },
})
