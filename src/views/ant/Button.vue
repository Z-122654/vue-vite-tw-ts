<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const [modal, contextHolder] = Modal.useModal()
const showConfirm = () => {
  modal.confirm({
    title: 'Do you Want to delete these items?',
    icon: h(ExclamationCircleOutlined),
    content: h('div', { style: 'color:red;' }, 'Some descriptions'),
    onOk() {
      console.log('OK')
    },
    onCancel() {
      console.log('Cancel')
    },
    class: 'test'
  })
}
const showDeleteConfirm = () => {
  modal.confirm({
    title: 'Are you sure delete this task?',
    icon: h(ExclamationCircleOutlined),
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK')
    },
    onCancel() {
      console.log('Cancel')
    }
  })
}
const showPropsConfirm = () => {
  modal.confirm({
    title: 'Are you sure delete this task?',
    icon: h(ExclamationCircleOutlined),
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      disabled: true
    },
    cancelText: 'No',
    onOk() {
      console.log('OK')
    },
    onCancel() {
      console.log('Cancel')
    }
  })
}

function showPromiseConfirm() {
  modal.confirm({
    title: 'Do you want to delete these items?',
    icon: h(ExclamationCircleOutlined),
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    async onOk() {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        })
      } catch {
        return console.log('Oops errors!')
      }
    },
    onCancel() {
    }
  })
}
</script>

<template>
  <a-space wrap>
    <a-button @click="showConfirm">Confirm</a-button>
    <a-button @click="showPromiseConfirm">With promise</a-button>
    <a-button type="dashed" @click="showDeleteConfirm">Delete</a-button>
    <a-button type="dashed" @click="showPropsConfirm">With extra props</a-button>
    <contextHolder />
  </a-space>
</template>

<style scoped lang="sass">

</style>