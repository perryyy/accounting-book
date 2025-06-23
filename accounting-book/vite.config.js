// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 如果你的 GitHub Repo 是 `https://github.com/your-name/my-expense-app`
// 則 base 要設成 `/my-expense-app/`
export default defineConfig({
  base: '/accounting-book/', // ⚠️ 修改為 GitHub 上 repo 名稱
  plugins: [vue()],
})
