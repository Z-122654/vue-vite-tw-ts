import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Alarm } from '@/types/alarm'
import { AlarmsStorageService } from '@/services/alarmsStorage'

const storageService = new AlarmsStorageService()

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const useAlarmsStore = defineStore('alarms', () => {
  const alarms = ref<Alarm[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sortedAlarms = computed(() =>
    [...alarms.value].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
  )

  const enabledAlarms = computed(() =>
    sortedAlarms.value.filter(alarm => alarm.enabled)
  )

  const nextAlarm = computed(() => enabledAlarms.value[0])

  const loadAlarms = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      alarms.value = storageService.loadAlarms()
    } catch (err) {
      error.value = '加载闹钟失败'
    } finally {
      loading.value = false
    }
  }

  const addAlarm = async (
    alarmData: Omit<Alarm, 'id' | 'createdAt'>
  ): Promise<Alarm> => {
    const newAlarm: Alarm = {
      ...alarmData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }

    storageService.addAlarm(newAlarm)
    alarms.value.unshift(newAlarm)
    return newAlarm
  }

  const updateAlarm = async (
    id: string,
    updates: Partial<Alarm>
  ): Promise<Alarm | null> => {
    const updatedAlarm = storageService.updateAlarm(id, updates)
    if (!updatedAlarm) return null

    const index = alarms.value.findIndex(alarm => alarm.id === id)
    if (index !== -1) {
      alarms.value[index] = updatedAlarm
    }

    return updatedAlarm
  }

  const deleteAlarm = async (id: string): Promise<boolean> => {
    const success = storageService.deleteAlarm(id)
    if (success) {
      const index = alarms.value.findIndex(alarm => alarm.id === id)
      if (index !== -1) {
        alarms.value.splice(index, 1)
      }
    }

    return success
  }

  const toggleAlarm = async (id: string): Promise<void> => {
    const target = alarms.value.find(alarm => alarm.id === id)
    if (!target) return

    await updateAlarm(id, { enabled: !target.enabled })
  }

  const getAlarmById = (id: string) => {
    return alarms.value.find(alarm => alarm.id === id) || null
  }

  return {
    alarms,
    loading,
    error,
    sortedAlarms,
    enabledAlarms,
    nextAlarm,
    loadAlarms,
    addAlarm,
    updateAlarm,
    deleteAlarm,
    toggleAlarm,
    getAlarmById
  }
})
