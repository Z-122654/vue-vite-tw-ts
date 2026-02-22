export interface Alarm {
  id: string
  time: string
  label: string
  repeat: string[]
  sound: string
  rampMinutes: number
  smartWake: boolean
  enabled: boolean
  createdAt: string
}

export interface AlarmsStorage {
  version: string
  alarms: Alarm[]
  lastUpdated: string
}

export const INITIAL_ALARMS: Alarm[] = [
  {
    id: 'default-1',
    time: '06:45',
    label: '早起提醒',
    repeat: ['mon', 'tue', 'wed', 'thu', 'fri'],
    sound: '清晨海风',
    rampMinutes: 12,
    smartWake: true,
    enabled: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'default-2',
    time: '08:10',
    label: '慢启动',
    repeat: ['sat', 'sun'],
    sound: '晨光钢琴',
    rampMinutes: 8,
    smartWake: false,
    enabled: false,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]
