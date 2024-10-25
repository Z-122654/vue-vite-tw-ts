import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const userArr = ref<UserInfo[]>([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ])

  const user: Ref<UserInfo | undefined> = ref()

  const addUser = (userInfo: UserInfo) => {
    userArr.value.push(userInfo)
  }
  const delUser = (index: number) => {
    userArr.value.splice(index, 1)
  }

  const updUser = (index: number, userInfo: UserInfo) => {
    userArr.value[index] = userInfo
  }

  return { userArr, user, addUser, delUser, updUser }
})

interface UserInfo {
  key: string | null | undefined,
  name: string | null | undefined,
  age: number | null | undefined,
  address: string | null | undefined,
  tags: string[] | null | undefined,
}