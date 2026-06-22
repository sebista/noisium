class ThemeManager {
  darkMode = $state(true)
  primaryColor = $state('#3584e4')

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedDark = localStorage.getItem('noisium_dark_mode')
        if (storedDark !== null) {
          this.darkMode = JSON.parse(storedDark)
        }
        const storedColor = localStorage.getItem('noisium_primary_color')
        if (storedColor !== null) {
          this.primaryColor = JSON.parse(storedColor)
        }
      } catch (e) {
        console.warn(`Error reading theme configuration from localStorage:`, e)
      }
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode
    if (typeof window !== 'undefined') {
      localStorage.setItem('noisium_dark_mode', JSON.stringify(this.darkMode))
    }
  }

  setPrimaryColor(color: string) {
    this.primaryColor = color
    if (typeof window !== 'undefined') {
      localStorage.setItem('noisium_primary_color', JSON.stringify(color))
    }
  }
}

export const theme = new ThemeManager()
