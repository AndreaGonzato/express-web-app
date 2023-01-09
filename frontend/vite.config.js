// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//const path = require('path')
import { fileURLToPath, URL } from "url";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})