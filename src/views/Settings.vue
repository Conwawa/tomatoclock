<template>
  <div class="background" style="background:#FFFDE7;height: 100vh;">
    <VContainer>
      <VRow>
        <VCol cols="12">
          <h1></h1>
        </VCol>
        <VCol cols="12">
          <h1 style="color: #757575 ">Notifications</h1>
        </VCol>
        <VCol cols="12">
          <VRadioGroup inline v-model="notify">
            <VRadio label="OPEN" :value="true"></VRadio>
            <VRadio label="CLOSE" :value="false"></VRadio>
          </VRadioGroup>
        </VCol>
        <VCol cols="12">
          <h1 style="color: #757575 ">Settings</h1>
        </VCol>
        <VCol cols="12">
          <VTable>
            <thead>
              <tr>
                <th>歌名</th>
                <th>試聽</th>
                <th>選擇</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alarm in settings.alarms" :key="alarm.id">
                <td>{{ alarm.name }}</td>
                <td>
                  <audio :src="alarm.file" controls></audio>
                </td>
                <td>
                  <VRadioGroup v-model="selectedAlarm">
                    <VRadio :value="alarm.id"></VRadio>
                  </VRadioGroup>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/store/settings'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()
const { selectedAlarm, alarms, notify } = storeToRefs(settings)
</script>
