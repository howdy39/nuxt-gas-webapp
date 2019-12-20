<template>
  <div>
    <h1>
      ユーザー検索
    </h1>
    <button @click="onSearchUsers">
      検索する
    </button>
    <div>
      {{ users }}
    </div>
  </div>
</template>

<script>
const mockUsers = [
  { 'no': 1, 'name': '白井律子', 'nameKana': 'シライリツコ', 'sex': '女', 'birthDay': '1960-02-10T15:00:00.000Z' },
  { 'no': 2, 'name': '川本友菜', 'nameKana': 'カワモトユウナ', 'sex': '女', 'birthDay': '1966-07-18T15:00:00.000Z' },
  { 'no': 3, 'name': '藤野鉄夫', 'nameKana': 'フジノテツオ', 'sex': '男', 'birthDay': '1995-01-23T15:00:00.000Z' }
]
export default {
  data () {
    return { users: [] }
  },
  asyncData (ctx) {
    return {
      isDev: ctx.isDev
    }
  },
  methods: {
    onSearchUsers () {
      if (this.isDev) {
        this.users = mockUsers
      } else {
        google.script.run.withSuccessHandler((res) => {
          console.log(res)
          this.users = res
        }).fetchAllUser()
      }
    }
  }
}
</script>

<style>
</style>
