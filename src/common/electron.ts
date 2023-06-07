
export const Electron = {
  focusTop: () => {
    // @ts-ignore
    if (window && window.api && window.api.focusTop) {
      // @ts-ignore
      window.api.focusTop()
    }
  },
  setAlwaysOnTop: (bool: boolean) => {
    // @ts-ignore
    if (window && window.api && window.api.alwaysOnTop) {
      // @ts-ignore
      window.api.alwaysOnTop(bool)
    }
  },
}