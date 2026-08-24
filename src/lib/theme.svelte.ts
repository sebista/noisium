class ThemeManager {
  darkMode = $state(true)
  primaryColor = $state('#3584e4')

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedDark = localStorage.getItem('noisium_dark_mode')
        if (storedDark !== null) {
          this.darkMode = storedDark === 'true'
        } else {
          this.darkMode = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches
        }
      } catch (e) {
        console.warn('Error reading dark mode preference from localStorage:', e)
      }

      try {
        const storedColor = localStorage.getItem('noisium_primary_color')
        if (storedColor) {
          this.primaryColor = storedColor.replace(/^"|"$/g, '')
        }
      } catch (e) {
        console.warn(
          'Error reading primary color preference from localStorage:',
          e,
        )
      }
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode
    if (typeof window !== 'undefined') {
      localStorage.setItem('noisium_dark_mode', String(this.darkMode))
    }
  }

  setPrimaryColor(color: string) {
    this.primaryColor = color
    if (typeof window !== 'undefined') {
      localStorage.setItem('noisium_primary_color', color)
    }
  }
}

export const theme = new ThemeManager()
