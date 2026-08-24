class DialogManager {
  isAboutOpen = $state(false)
  isSavePresetOpen = $state(false)
  newPresetName = $state('')

  isRenamePresetOpen = $state(false)
  renameTarget = $state('')
  renameValue = $state('')

  isOverwritePresetOpen = $state(false)
  overwriteTarget = $state('')

  isDeletePresetOpen = $state(false)
  deleteTarget = $state('')

  openAbout() {
    this.isAboutOpen = true
  }

  closeAbout() {
    this.isAboutOpen = false
  }

  openSavePreset() {
    this.newPresetName = ''
    this.isSavePresetOpen = true
  }

  closeSavePreset() {
    this.isSavePresetOpen = false
    this.newPresetName = ''
  }

  openRenamePreset(name: string) {
    this.renameTarget = name
    this.renameValue = name
    this.isRenamePresetOpen = true
  }

  closeRenamePreset() {
    this.isRenamePresetOpen = false
    this.renameTarget = ''
    this.renameValue = ''
  }

  openOverwritePreset(name: string) {
    this.overwriteTarget = name
    this.isOverwritePresetOpen = true
  }

  closeOverwritePreset() {
    this.isOverwritePresetOpen = false
    this.overwriteTarget = ''
  }

  openDeletePreset(name: string) {
    this.deleteTarget = name
    this.isDeletePresetOpen = true
  }

  closeDeletePreset() {
    this.isDeletePresetOpen = false
    this.deleteTarget = ''
  }
}

export const dialogs = new DialogManager()
