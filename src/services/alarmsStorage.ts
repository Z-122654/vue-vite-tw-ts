import type { Alarm, AlarmsStorage } from '@/types/alarm'
import { INITIAL_ALARMS } from '@/types/alarm'

export class AlarmsStorageService {
  private readonly STORAGE_KEY = 'alarm-app-alarms'
  private readonly STORAGE_VERSION = '1.0.0'

  loadAlarms(): Alarm[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) {
        this.saveAlarms(INITIAL_ALARMS)
        return INITIAL_ALARMS
      }

      const data: AlarmsStorage = JSON.parse(stored)
      if (data.version !== this.STORAGE_VERSION) {
        return this.migrateData(data)
      }

      if (!Array.isArray(data.alarms)) {
        return INITIAL_ALARMS
      }

      return data.alarms
    } catch (error) {
      return INITIAL_ALARMS
    }
  }

  saveAlarms(alarms: Alarm[]): void {
    const storageData: AlarmsStorage = {
      version: this.STORAGE_VERSION,
      alarms,
      lastUpdated: new Date().toISOString()
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storageData))
  }

  addAlarm(alarm: Alarm): void {
    const alarms = this.loadAlarms()
    alarms.unshift(alarm)
    this.saveAlarms(alarms)
  }

  updateAlarm(id: string, updates: Partial<Alarm>): Alarm | null {
    const alarms = this.loadAlarms()
    const index = alarms.findIndex(alarm => alarm.id === id)

    if (index === -1) {
      return null
    }

    alarms[index] = { ...alarms[index], ...updates }
    this.saveAlarms(alarms)
    return alarms[index]
  }

  deleteAlarm(id: string): boolean {
    const alarms = this.loadAlarms()
    const index = alarms.findIndex(alarm => alarm.id === id)

    if (index === -1) {
      return false
    }

    alarms.splice(index, 1)
    this.saveAlarms(alarms)
    return true
  }

  clearAllAlarms(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }

  private migrateData(oldData: Record<string, any>): Alarm[] {
    if (Array.isArray(oldData.alarms)) {
      return oldData.alarms
    }

    return INITIAL_ALARMS
  }
}
