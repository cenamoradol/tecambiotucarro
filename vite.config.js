import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const varsPath = path.resolve('src/styles/_variables.scss').replace(/\\/g, '/')
const mixinsPath = path.resolve('src/styles/_mixins.scss').replace(/\\/g, '/')

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "${varsPath}" as *; @use "${mixinsPath}" as *;\n`
            }
        }
    }
})
