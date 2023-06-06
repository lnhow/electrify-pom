export const Electron = {
  focusTop: () => {
    // @ts-ignore
    if (window && window.api && window.api.focusTop) {
      // @ts-ignore
      window.api.focusTop()
    }
  }
}