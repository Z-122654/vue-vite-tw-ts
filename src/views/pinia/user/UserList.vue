<script setup lang="ts">
import { SmileOutlined, EditTwoTone } from '@ant-design/icons-vue'
import { useUsersStore } from '@/store/users'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const userStore = useUsersStore()

const { userArr } = storeToRefs(userStore)

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags'
  },
  {
    title: 'Action',
    key: 'action'
  }
]

const pagination = reactive({
  hideOnSinglePage: true
})

const rowClassName = function (record, index) {
  return index % 2 === 1 ? 'row-grey' : ''
}

const open = ref(false)

const handleOk = function (e: MouseEvent) {
  console.log(e)
  open.value = false
}

const editForm = function () {
  open.value = true
}
//vscode-two分支第测试提交
</script>

<template>
  <div>
    <a-table
      :bordered="true"
      :columns="columns"
      :data-source="userArr"
      :pagination="pagination"
      :row-class-name="rowClassName"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <SmileOutlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="
                tag === 'loser'
                  ? 'volcano'
                  : tag.length > 5
                    ? 'geekblue'
                    : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <EditTwoTone :style="{ fontSize: '22px' }" @click="editForm" />
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <a-modal v-model:open="open" title="用户详情" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style scoped lang="sass">
:deep(.row-grey)
  background-color: #fafafa
</style>
