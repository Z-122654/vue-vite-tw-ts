<template>
  <div class="alarm-config">
    <div class="page">
      <header class="header">
        <button class="back-btn" type="button" @click="goBack">
          <span>←</span>
        </button>
        <div class="header-text">
          <h1>{{ isEdit ? '编辑闹钟' : '配置闹钟' }}</h1>
          <p>设置时间、重复与铃声细节</p>
        </div>
        <button class="save-btn" type="button" @click="handleSave">
          保存
        </button>
      </header>

      <section class="card">
        <label class="label">闹钟时间</label>
        <div class="time-row">
          <input v-model="form.time" class="time-input" type="time">
          <span class="ampm">{{ ampm }}</span>
        </div>
      </section>

      <section class="card">
        <label class="label">标签</label>
        <input
          v-model="form.label"
          class="text-input"
          type="text"
          placeholder="例如：早起提醒"
        >
      </section>

      <section class="card">
        <label class="label">重复</label>
        <div class="repeat-grid">
          <label v-for="day in repeatOptions" :key="day.value" class="repeat-item">
            <input v-model="form.repeat" type="checkbox" :value="day.value">
            <span>{{ day.label }}</span>
          </label>
        </div>
      </section>

      <section class="card dark-card">
        <label class="label light">铃声</label>
        <select v-model="form.sound" class="select-input">
          <option v-for="sound in soundOptions" :key="sound" :value="sound">
            {{ sound }}
          </option>
        </select>
        <div class="subtext">渐强时长</div>
        <input
          v-model.number="form.rampMinutes"
          class="number-input"
          type="number"
          min="0"
          max="30"
        >
      </section>

      <section class="card">
        <div class="toggle-row">
          <div>
            <div class="label">智能唤醒</div>
            <div class="subtext">根据睡眠阶段提前唤醒</div>
          </div>
          <button
            class="toggle"
            type="button"
            :class="{ on: form.smartWake }"
            @click="form.smartWake = !form.smartWake"
          >
            <span class="toggle-dot"></span>
          </button>
        </div>
      </section>

      <section class="card">
        <div class="toggle-row">
          <div>
            <div class="label">启用闹钟</div>
            <div class="subtext">保存后立即生效</div>
          </div>
          <button
            class="toggle"
            type="button"
            :class="{ on: form.enabled }"
            @click="form.enabled = !form.enabled"
          >
            <span class="toggle-dot"></span>
          </button>
        </div>
      </section>

      <button
        v-if="isEdit"
        class="danger-btn"
        type="button"
        @click="handleDelete"
      >
        删除闹钟
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlarmsStore } from '@/stores/alarms'

const router = useRouter()
const route = useRoute()
const store = useAlarmsStore()

const repeatOptions = [
  { value: 'mon', label: '周一' },
  { value: 'tue', label: '周二' },
  { value: 'wed', label: '周三' },
  { value: 'thu', label: '周四' },
  { value: 'fri', label: '周五' },
  { value: 'sat', label: '周六' },
  { value: 'sun', label: '周日' }
]

const soundOptions = ['清晨海风', '晨光钢琴', '木质风铃', '白噪雨声']

const defaultForm = () => ({
  time: '07:30',
  label: '起床提醒',
  repeat: ['mon', 'tue', 'wed', 'thu', 'fri'],
  sound: soundOptions[0],
  rampMinutes: 12,
  smartWake: true,
  enabled: true
})

const form = ref(defaultForm())

const isEdit = computed(() => typeof route.params.id === 'string')

const ampm = computed(() => {
  const [hour] = form.value.time.split(':').map(Number)
  return hour >= 12 ? '下午' : '上午'
})

const loadForm = () => {
  const id = route.params.id
  if (typeof id !== 'string') {
    form.value = defaultForm()
    return
  }
  const alarm = store.getAlarmById(id)
  if (!alarm) {
    form.value = defaultForm()
    return
  }
  form.value = {
    time: alarm.time,
    label: alarm.label,
    repeat: [...alarm.repeat],
    sound: alarm.sound,
    rampMinutes: alarm.rampMinutes,
    smartWake: alarm.smartWake,
    enabled: alarm.enabled
  }
}

const handleSave = async () => {
  const payload = {
    time: form.value.time,
    label: form.value.label,
    repeat: form.value.repeat,
    sound: form.value.sound,
    rampMinutes: form.value.rampMinutes,
    smartWake: form.value.smartWake,
    enabled: form.value.enabled
  }
  const id = route.params.id
  if (typeof id === 'string') {
    await store.updateAlarm(id, payload)
  } else {
    await store.addAlarm(payload)
  }
  router.push('/alarm')
}

const handleDelete = async () => {
  const id = route.params.id
  if (typeof id !== 'string') return
  await store.deleteAlarm(id)
  router.push('/alarm')
}

const goBack = () => {
  router.push('/alarm')
}

onMounted(async () => {
  await store.loadAlarms()
  loadForm()
})

watch(
  () => route.params.id,
  () => {
    loadForm()
  }
)
</script>

<style lang="sass" scoped>
.alarm-config
  min-height: 100vh
  background: linear-gradient(180deg, #f7f2ff 0%, #e9f6ff 55%, #fdf2e6 100%)
  color: #121316

.page
  max-width: 900px
  margin: 0 auto
  padding: 24px 24px 60px
  display: flex
  flex-direction: column
  gap: 16px

.header
  display: grid
  grid-template-columns: auto 1fr auto
  align-items: center
  gap: 16px

.header-text h1
  font-size: 22px
  margin: 0

.header-text p
  margin: 6px 0 0
  font-size: 13px
  color: #7a7f86

.back-btn
  width: 40px
  height: 40px
  border-radius: 999px
  border: none
  background: rgba(255, 255, 255, 0.9)
  font-size: 18px
  cursor: pointer

.save-btn
  border: none
  background: #1e1f2a
  color: #ffffff
  padding: 8px 18px
  border-radius: 999px
  font-size: 14px
  cursor: pointer

.card
  background: rgba(255, 255, 255, 0.88)
  border-radius: 22px
  padding: 18px
  display: flex
  flex-direction: column
  gap: 12px
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08)

.dark-card
  background: #1e1f2a
  color: #ffffff

.label
  font-size: 14px
  font-weight: 600
  color: #343844

.label.light
  color: #ffffff

.time-row
  display: flex
  align-items: center
  gap: 16px

.time-input
  font-size: 32px
  font-weight: 600
  border: none
  background: transparent
  color: inherit

.ampm
  font-size: 14px
  color: #7a7f86

.text-input,
.select-input,
.number-input
  border: 1px solid rgba(120, 130, 150, 0.2)
  border-radius: 14px
  padding: 10px 12px
  font-size: 14px
  background: #ffffff
  color: #121316

.dark-card .select-input,
.dark-card .number-input
  background: #2b2d3a
  color: #ffffff
  border-color: rgba(255, 255, 255, 0.15)

.repeat-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr))
  gap: 10px

.repeat-item
  display: flex
  align-items: center
  gap: 8px
  font-size: 13px

.subtext
  font-size: 12px
  color: #7a7f86

.dark-card .subtext
  color: #c6cad4

.toggle-row
  display: flex
  justify-content: space-between
  align-items: center
  gap: 16px

.toggle
  width: 50px
  height: 28px
  border-radius: 999px
  border: none
  background: rgba(148, 163, 184, 0.5)
  position: relative
  cursor: pointer
  transition: background 0.2s ease

.toggle.on
  background: rgba(99, 179, 255, 0.55)

.toggle-dot
  width: 22px
  height: 22px
  border-radius: 999px
  background: #ffffff
  position: absolute
  top: 3px
  left: 3px
  transition: transform 0.2s ease

.toggle.on .toggle-dot
  transform: translateX(22px)

.danger-btn
  border: none
  background: #f97316
  color: #ffffff
  padding: 10px 18px
  border-radius: 16px
  font-size: 14px
  cursor: pointer
  align-self: flex-start

@media (max-width: 768px)
  .page
    padding: 20px 16px 40px

  .header
    grid-template-columns: auto 1fr

  .save-btn
    grid-column: 2 / 3
    justify-self: end
</style>
