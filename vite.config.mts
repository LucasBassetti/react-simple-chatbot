import { defineConfig } from 'vitest/config';

export default defineConfig({
  // the classic runtime only needs `react` as external, so the UMD bundle works with React 18 and 19.
  // Without development mode, React 19 does not warn about the classic runtime in the example.
  oxc: {
    jsx: { runtime: 'classic', development: false }
  },
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'ReactSimpleChatbot',
      formats: ['es', 'umd'],
      fileName: format => (format === 'es' ? 'react-simple-chatbot.mjs' : 'react-simple-chatbot.js')
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.{ts,tsx}'],
    setupFiles: ['tests/setup.ts'],
    coverage: {
      include: ['src/**'],
      reporter: ['text', 'html'],
      thresholds: {
        functions: 80,
        lines: 80
      }
    }
  }
});
