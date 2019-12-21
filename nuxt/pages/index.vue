<template>
  <div class="container">
    <header class="header">
      <h1 class="title">
        ユーザー検索
      </h1>
      <a target="_blank" rel="noopener" href="https://docs.google.com/spreadsheets/d/1b6DzgycssKjEe1XPD2nNch_Q2y3t6yPY9rVlJGjVr1s/edit?folder=0Bwjf11kBj8AHMTQzTzFydnlKdm8#gid=0">
        <i class="fas fa-user-cog" />
      </a>
    </header>
    <el-form :inline="true" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="input" placeholder="Please input" />
      </el-form-item>
    </el-form>
    <el-table
      :data="users"
      style="width: 100%"
    >
      <el-table-column
        prop="no"
        label="No"
        width="180"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="nameKana"
        label="NameKana"
      />
      <el-table-column
        prop="sex"
        label="Sex"
      />
      <el-table-column
        prop="birthDay"
        label="BirthDay"
      />
    </el-table>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

const mockUsers = [
  { 'no': 1, 'name': '白井律子', 'nameKana': 'シライリツコ', 'sex': '女', 'birthDay': '1960-02-10T15:00:00.000Z' },
  { 'no': 2, 'name': '川本友菜', 'nameKana': 'カワモトユウナ', 'sex': '女', 'birthDay': '1966-07-18T15:00:00.000Z' },
  { 'no': 3, 'name': '藤野鉄夫', 'nameKana': 'フジノテツオ', 'sex': '男', 'birthDay': '1995-01-23T15:00:00.000Z' },
  { 'no': 4, 'name': '中森匠', 'nameKana': 'ナカモリタクミ', 'sex': '男', 'birthDay': '1994-07-03T15:00:00.000Z' },
  { 'no': 5, 'name': '横溝茂行', 'nameKana': 'ヨコミゾシゲユキ', 'sex': '男', 'birthDay': '1980-12-10T15:00:00.000Z' },
  { 'no': 6, 'name': '森下好夫', 'nameKana': 'モリシタヨシオ', 'sex': '男', 'birthDay': '1966-01-02T15:00:00.000Z' },
  { 'no': 7, 'name': '川原勝美', 'nameKana': 'カワハラカツミ', 'sex': '女', 'birthDay': '1967-12-26T15:00:00.000Z' },
  { 'no': 8, 'name': '佐竹政治', 'nameKana': 'サタケマサジ', 'sex': '男', 'birthDay': '1988-04-06T15:00:00.000Z' },
  { 'no': 9, 'name': '亀田莉紗', 'nameKana': 'カメダリサ', 'sex': '女', 'birthDay': '1966-01-10T15:00:00.000Z' },
  { 'no': 10, 'name': '千葉太喜', 'nameKana': 'チバタイキ', 'sex': '男', 'birthDay': '1993-07-07T15:00:00.000Z' }
]
export default {
  data () {
    return { allUsers: null, input: '', users: [] }
  },
  watch: {
    input () {
      debounce(() => {
        this.onSearchUsers()
      }, 200)()
    }
  },
  asyncData (ctx) {
    return {
      isDev: ctx.isDev
    }
  },
  methods: {
    onSearchUsers () {
      // キャッシュがある場合キャッシュを利用
      if (this.allUsers !== null) {
        console.log('use cache')
        this.searchUsers(this.input)
        return
      }

      this.$nuxt.$loading.start()
      this.fetchAllUsers().then(() => {
        this.searchUsers(this.input)
        this.$nuxt.$loading.finish()
      })
    },
    searchUsers (query) {
      this.users = this.allUsers.filter((user) => {
        return String(user.no).includes(query) || user.name.includes(query) || user.nameKana.includes(query)
      })
    },
    fetchAllUsers () {
      const promise = new Promise((resolve, reject) => {
        if (this.isDev) {
          this.allUsers = mockUsers
          resolve()
        } else {
          google.script.run.withSuccessHandler((res) => {
            this.allUsers = JSON.parse(res)
            resolve()
          }).fetchAllUser()
        }
      })
      return promise
    }
  }
}
</script>

<style scoped>
.container {
  margin: 48px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}

.fas {
  text-decoration: none;
  color: #000000;
  font-size: 24px;
}
.fas:hover {
  opacity: 0.5;
}

</style>
