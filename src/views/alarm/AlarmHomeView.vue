<template>
  <div class="alarm-home">
    <div class="page">
      <header class="header">
        <div class="header-text">
          <p class="title">起床啦</p>
          <p class="time">{{ timeText }}</p>
          <p class="date">{{ dateText }}</p>
          <p class="next">{{ nextAlarmText }}</p>
        </div>
        <button class="icon-button" type="button" @click="goToConfig()">
          <span class="icon">+</span>
        </button>
      </header>

      <section class="card next-card">
        <div class="card-header">
          <span class="card-title">下一个闹钟</span>
          <span class="chip">{{ nextAlarmRepeat }}</span>
        </div>
        <div class="card-time">{{ nextAlarmTime }}</div>
        <div class="card-sub">{{ nextAlarmDetail }}</div>
      </section>

      <section class="card sleep-card">
        <div class="card-title">睡眠模式</div>
        <div class="card-sub light">轻柔助眠声音</div>
        <div class="card-badge">22:30 开启</div>
      </section>

      <section class="list">
        <div class="list-header">
          <h2>闹钟列表</h2>
          <button class="ghost-btn" type="button" @click="goToConfig()">
            新建闹钟
          </button>
        </div>

        <div v-if="store.loading" class="list-empty">加载中...</div>
        <div v-else-if="store.sortedAlarms.length === 0" class="list-empty">
          还没有闹钟，先创建一个吧
        </div>
        <div v-else class="list-body">
          <div
            v-for="alarm in store.sortedAlarms"
            :key="alarm.id"
            class="alarm-row"
          >
            <div class="alarm-info" @click="goToConfig(alarm.id)">
              <div class="alarm-time">{{ alarm.time }}</div>
              <div class="alarm-meta">
                <span class="alarm-label">{{ alarm.label }}</span>
                <span class="alarm-repeat">{{ formatRepeat(alarm.repeat) }}</span>
              </div>
            </div>
            <div class="alarm-actions">
              <button
                class="toggle"
                type="button"
                :class="{ on: alarm.enabled }"
                @click="toggleAlarm(alarm.id)"
              >
                <span class="toggle-dot" />
              </button>
              <button class="edit-btn" type="button" @click="goToConfig(alarm.id)">
                编辑
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlarmsStore } from '@/stores/alarms'
import type { Alarm } from '@/types/alarm'

const router = useRouter()
const store = useAlarmsStore()

const now = ref(new Date())
let timer: number | undefined

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    weekday: 'long',
    month: 'numeric',
    day: 'numeric'
  })
}

const formatRepeat = (repeat: Alarm['repeat']) => {
  if (repeat.length === 7) return '每天'
  if (repeat.length === 0) return '仅一次'
  const weekdaySet = new Set(['mon', 'tue', 'wed', 'thu', 'fri'])
  const isWeekday = repeat.every(day => weekdaySet.has(day))
  if (isWeekday && repeat.length === 5) return '工作日'
  const map: Record<string, string> = {
    mon: '周一',
    tue: '周二',
    wed: '周三',
    thu: '周四',
    fri: '周五',
    sat: '周六',
    sun: '周日'
  }
  return repeat.map(day => map[day]).join(' ')
}

const getCountdown = (alarm?: Alarm) => {
  if (!alarm) return '暂无闹钟'
  const [hours, minutes] = alarm.time.split(':').map(Number)
  const target = new Date(now.value)
  target.setHours(hours, minutes, 0, 0)
  if (target.getTime() <= now.value.getTime()) {
    target.setDate(target.getDate() + 1)
  }
  const diff = target.getTime() - now.value.getTime()
  const totalMinutes = Math.max(0, Math.round(diff / 60000))
  const hourPart = Math.floor(totalMinutes / 60)
  const minutePart = totalMinutes % 60
  return `距离下次响铃 ${hourPart}小时${minutePart}分`
}

const timeText = computed(() => formatTime(now.value))
const dateText = computed(() => formatDate(now.value))
const nextAlarmText = computed(() => getCountdown(store.nextAlarm))
const nextAlarmTime = computed(() => store.nextAlarm?.time || '--:--')
const nextAlarmRepeat = computed(() =>
  store.nextAlarm ? formatRepeat(store.nextAlarm.repeat) : '暂无'
)
const nextAlarmDetail = computed(() => {
  if (!store.nextAlarm) return '先创建一个闹钟吧'
  const ramp = store.nextAlarm.rampMinutes
  return `铃声：${store.nextAlarm.sound} · 渐强 ${ramp}分钟`
})

const goToConfig = (id?: string) => {
  if (id) {
    router.push(`/alarm/config/${id}`)
    return
  }
  router.push('/alarm/config')
}

const toggleAlarm = async (id: string) => {
  await store.toggleAlarm(id)
}

onMounted(async () => {
  await store.loadAlarms()
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 30000)
})

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<style lang="sass" scoped>
.alarm-home
  min-height: 100vh
  background: linear-gradient(180deg, #f8f3e7 0%, #e6f1ff 60%, #fdf2e6 100%)
  color: #121316

.page
  max-width: 1100px
  margin: 0 auto
  padding: 28px 24px 60px

.header
  display: flex
  justify-content: space-between
  align-items: flex-start
  margin-bottom: 24px

.header-text
  display: flex
  flex-direction: column
  gap: 8px

.title
  font-size: 20px
  font-weight: 600

.time
  font-size: 56px
  font-weight: 600
  letter-spacing: -1px

.date
  color: #5f6368
  font-size: 16px

.next
  color: #7a7f86
  font-size: 14px

.icon-button
  width: 42px
  height: 42px
  border-radius: 999px
  border: none
  background: rgba(255, 255, 255, 0.85)
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08)
  cursor: pointer

.icon
  font-size: 20px
  font-weight: 600

.card
  border-radius: 24px
  padding: 18px 20px
  margin-bottom: 18px
  background: rgba(255, 255, 255, 0.85)
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08)

.next-card
  display: flex
  flex-direction: column
  gap: 8px

.card-header
  display: flex
  justify-content: space-between
  align-items: center

.card-title
  font-size: 14px
  font-weight: 600
  color: #343844

.chip
  background: rgba(255, 166, 123, 0.25)
  color: #b85a2e
  padding: 6px 12px
  border-radius: 999px
  font-size: 11px
  font-weight: 600

.card-time
  font-size: 34px
  font-weight: 600

.card-sub
  font-size: 13px
  color: #6a6f78

.sleep-card
  background: #1e1f2a
  color: #ffffff
  position: relative

.sleep-card .card-sub
  color: #c6cad4

.sleep-card .card-title
  color: #ffffff

.card-badge
  position: absolute
  right: 18px
  top: 18px
  background: rgba(109, 187, 255, 0.25)
  color: #8ec8ff
  padding: 6px 10px
  border-radius: 999px
  font-size: 11px
  font-weight: 600

.list
  margin-top: 32px

.list-header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 16px

.list-header h2
  font-size: 18px
  font-weight: 600

.ghost-btn
  border: 1px solid rgba(120, 130, 150, 0.3)
  background: transparent
  border-radius: 999px
  padding: 8px 14px
  font-size: 13px
  cursor: pointer

.list-body
  display: flex
  flex-direction: column
  gap: 12px

.list-empty
  padding: 24px
  color: #7a7f86
  text-align: center
  background: rgba(255, 255, 255, 0.7)
  border-radius: 18px

.alarm-row
  display: flex
  justify-content: space-between
  align-items: center
  padding: 14px 18px
  background: rgba(255, 255, 255, 0.9)
  border-radius: 18px
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.08)

.alarm-info
  display: flex
  flex-direction: column
  gap: 6px
  cursor: pointer

.alarm-time
  font-size: 22px
  font-weight: 600

.alarm-meta
  display: flex
  gap: 10px
  font-size: 12px
  color: #7a7f86

.alarm-actions
  display: flex
  align-items: center
  gap: 10px

.toggle
  width: 46px
  height: 26px
  border-radius: 999px
  border: none
  background: rgba(148, 163, 184, 0.5)
  position: relative
  cursor: pointer
  transition: background 0.2s ease

.toggle.on
  background: rgba(99, 179, 255, 0.55)

.toggle-dot
  width: 20px
  height: 20px
  border-radius: 999px
  background: #ffffff
  position: absolute
  top: 3px
  left: 3px
  transition: transform 0.2s ease

.toggle.on .toggle-dot
  transform: translateX(20px)

.edit-btn
  border: none
  background: #1e1f2a
  color: #ffffff
  font-size: 12px
  padding: 6px 12px
  border-radius: 999px
  cursor: pointer

@media (max-width: 768px)
  .page
    padding: 24px 16px 48px

  .time
    font-size: 44px

  .alarm-row
    flex-direction: column
    align-items: flex-start

  .alarm-actions
    width: 100%
    justify-content: space-between
</style>
