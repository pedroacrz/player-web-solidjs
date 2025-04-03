import { defineConfig } from 'vite';


export default defineConfig({
    build: {
        target: 'es5', // Alvo para compatibilidade com navegadores mais antigos
    }
    // ...
})