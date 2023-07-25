import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore('list', {
  state: () => ({
    items: [],
    currentItem: '',
    finishedItems: [],
    id: 1,
    timeleft: time,
    break: false
  }),
  // 修改 state 的 function
  actions: {
    addItem (name) {
      this.items.push({
        id: this.id++,
        name,
        edit: false,
        model: name
      })
    },
    editItem (id) {
      const i = this.items.findIndex(item => item.id === id)
      if (i < 0) return
      this.items[i].edit = true
    },
    cancelEditItem (id) {
      const i = this.items.findIndex(item => item.id === id)
      if (i < 0) return
      this.items[i].edit = false
      this.items[i].model = this.items[i].name
    },
    delItem (id) {
      const i = this.items.findIndex(item => item.id === id)
      if (i < 0) return
      this.items.splice(i, 1)
    },
    confirmEditItem (id) {
      const i = this.items.findIndex(item => item.id === id)
      if (i < 0) return
      this.items[i].edit = false
      this.items[i].name = this.items[i].model
    },
    setCurrentItem () {
      // .shift() 把陣列的第一個東西移除並回傳
      this.currentItem = this.break ? 'Take A Break' : this.items.shift().name
    },
    countdown () {
      this.timeleft--
    },
    setFinishItem () {
      // 如果現在不是休息時間，才把東西 push 進去 完成事項finishedItems 裡面
      if (!this.break) {
        this.finishedItems.push({
          name: this.currentItem,
          id: this.id++
        })
      }

      this.currentItem = ''
      if (this.items.length > 0) {
        this.break = !this.break
      }
      this.timeleft = this.break ? timeBreak : time
    },
    delFinishedItem (id) {
      const i = this.finishedItems.findIndex(item => item.id === id)
      if (i < 0) return
      this.finishedItems.splice(i, 1)
    }
  },
  persist: {
    key: 'pomodoro-list'
  }
})
