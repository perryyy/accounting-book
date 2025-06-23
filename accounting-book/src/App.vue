<template>
  <div class="account-book">
    <div class="top-header">
      <span>記帳小幫手</span>
    </div>
    <div class="main">
      <div class="currency-value">
        <span>韓幣幣值：</span>
        <el-input v-model.number="exchangeRate" style="width: 240px" placeholder="請輸入匯率" />
      </div>
      <div class="product">
        <div class="date mt-2">
          <span>購買日期：</span>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="選擇日期與時間"
            style="width: 240px"
          />
        </div>
        <div class="name mt-2">
          <span>商品名稱：</span>
          <el-input v-model="productName" style="width: 240px" />
        </div>
        <div class="price mt-2">
          <span>韓幣價錢：</span>
          <el-input v-model="productKrw" style="width: 240px" :min="0" />
        </div>
        <div class="price_tw mt-2">
          <span>台幣價錢：</span>
          <el-input
            :model-value="computedTwd"
            style="width: 240px"
            :disabled="true"
          />
        </div>
        <div class="action mt-2">
          <el-button type="info" @click="clearForm">清除</el-button>
          <el-button type="primary" @click="saveRecord">儲存</el-button>
        </div>
      </div>
      <el-divider />
      <el-table 
        :default-sort="{ prop: 'date', order: 'descending' }"
        :data="records" style="width: 100%;" 
        height="250"
       >
        <el-table-column prop="date" label="購買日期" width="110" sortable />
        <el-table-column prop="name" label="商品名稱" width="100" />
        <el-table-column prop="krw" label="韓幣價錢" width="110" sortable />
        <el-table-column prop="twd" label="台幣價錢" width="110" sortable />
        <el-table-column label="操作" width="80">
          <template #default="{ row, $index }">
            <el-button type="danger" size="small" @click="deleteRecord($index)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <div class="summary">
        <div>總韓幣：₩{{ totalKrw }}</div>
        <div>總台幣：${{ totalTwd }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const exchangeRate = ref(40)
const date = ref(new Date())
const productName = ref('')
const productKrw = ref(0)
const productTwd = ref(0)
const records = ref([])

const computedTwd = computed(() => {
  if (exchangeRate.value > 0 && productKrw.value > 0) {
    return Math.round(productKrw.value / exchangeRate.value)
  }
  return 0
})

const totalKrw = computed(() => {
  return records.value.reduce((sum, item) => sum + item.krw, 0)
})

const totalTwd = computed(() => {
  return records.value.reduce((sum, item) => sum + item.twd, 0)
})

const clearForm = () => {
  date.value = new Date()
  productName.value = ''
  productKrw.value = 0
  productTwd.value = 0
}

const saveRecord = () => {
  if (!date.value || !productName.value) {
    ElMessage.warning('請填寫完整資料')
    return
  }

  const newRecord = {
    date: new Date(date.value).toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' }),
    name: productName.value,
    krw: productKrw.value,
    twd: computedTwd.value
  }

  records.value.push(newRecord)
  localStorage.setItem('records', JSON.stringify(records.value))
  clearForm()
}

const deleteRecord = (index) => {
  records.value.splice(index, 1)
  localStorage.setItem('records', JSON.stringify(records.value))
}

onMounted(() => {
  const stored = localStorage.getItem('records')
  if (stored) {
    records.value = JSON.parse(stored)
  }
})
</script>

<style scoped>
.mt-2 {
  margin-top: 16px;
}
.account-book {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.top-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #409EFF;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.currency-value {
  display: flex;
  align-items: center;
}

.action {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-right: 36px;
}

.main {
  padding: 16px;
  flex: 1;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary {
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  padding-right: 16px;
}
</style>