<template>
  <div class="background" style="background:#FFFDE7;height: 100vh;">
    <VContainer>
      <VRow class="text-center" style="color: #757575 ">
        <VCol cols="12"></VCol>
        <VCol cols="12">
          <h1>{{ currentText }}</h1>
          <h1>{{ currentTime }}</h1>
        </VCol>
        <VCol cols="12">
          <VBtn variant="text" icon="mdi-play" v-if="status !== STATUS.COUNTING" @click="startTimer"></VBtn>
          <VBtn variant="text" icon="mdi-pause" v-if="status === STATUS.COUNTING" @click="pauseTimer"></VBtn>
          <VBtn variant=" text" icon="mdi-skip-next" v-if="currentItem.length > 0" @click="finishTimer"></VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import { useListStore } from '@/store/list'
import { useSettingsStore } from '@/store/settings'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useWebNotification } from '@vueuse/core'

const list = useListStore()
const { items, currentItem, timeleft } = storeToRefs(list)
const { countdown, setCurrentItem, setFinishItem } = list

const settings = useSettingsStore()
const { selectedAlarmFile, notify } = storeToRefs(settings)

const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}
const status = ref(STATUS.STOP)

// 倒數計時器
let timer = 0

const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  if (currentItem.value.length === 0) return

  status.value = STATUS.COUNTING
  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()

  if (notify.value) {
    const { show } = useWebNotification({
      title: 'WELL DONE!!!',
      body: currentText.value,
      icon: 'http://github.com/wdaweb.png'
    })
    show()
  }

  setFinishItem()

  if (items.value.length > 0) {
    startTimer()
  }
}

const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const currentText = computed(() => {
  return currentItem.value.length > 0 ? currentItem.value : items.value.length > 0 ? 'Click To Start' : 'Empty List'
})

const currentTime = computed(() => {
  // 要先用 toString() 將數字轉成文字，才能使用 padStart(填到2位數,用0來補) 補 0
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})

</script>
