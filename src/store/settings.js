// Utilities
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // what this store has
    alarms: [
      { id: 1, name: 'Ringtone', file: new URL('@/assets/ringtone.mp3', import.meta.url).href },
      { id: 2, name: 'Rylynn', file: new URL('@/assets/rylynn.mp3', import.meta.url).href }
    ],
    // 預設選到 id 是 1 的鈴聲
    selectedAlarm: 1,
    notify: false
  }),
  //  getters 是用來取 state 資料的 function
  getters: {
    selectedAlarmFile () {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarm)
      return this.alarms[i].file
    }
  },
  persist: {
    key: 'pomodoro-settings',
    // paths 寫要存進 local storage 的資料
    paths: [
      'selectedAlarm', 'notify'
    ]
  }
})
