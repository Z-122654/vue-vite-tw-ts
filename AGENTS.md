# AGENTS.md

## Build/Lint/Test Commands

### Development

- `npm run dev` - Start Vite dev server on port 3000

### Build

- `npm run build` - Generate production build (runs type check first)
- `npm run serve` - Preview production build locally

### Type Checking

- `npm run validate:types` - Run TypeScript compiler check without emitting files

### Unit Tests (Vitest)

- `npm run test` - Run all unit tests in `test/unit`
- `npm run test:watch` - Run tests in watch mode
- `npm run coverage` - Run tests with coverage reports (80% threshold)
- **Run single test**: `npm run test -- <path-to-spec>` (e.g., `npm run test -- test/unit/views/HelloWorld.spec.ts`)

### E2E Tests (Cypress)

- `npm run test:e2e` - Start dev server + Cypress interactive runner
- `npm run test:e2e:headless` - Run Cypress tests in headless mode
- `npm run test:e2e:wsl` - For WSL environment setup

### Linting/Formatting

- `npm run lint` - Run ESLint on src/ with auto-fix
- `npm run format` - Format all files with Prettier

## Code Style Guidelines

### File Structure

- Use `<script setup lang="ts">` syntax for Vue SFCs
- Component files: PascalCase (e.g., `HelloWorld.vue`)
- Test files: `*.spec.ts` pattern (e.g., `HelloWorld.spec.ts`)
- Store files: camelCase (e.g., `users.ts`)

### Imports

Order imports in this specific sequence:

1. Vue ecosystem (vue, vue-router, pinia)
2. Third-party libraries (@ant-design, naive-ui, lodash-es)
3. Local modules/components (using `@/` alias)

Example:

```ts
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { NButton } from 'naive-ui'
```

### Formatting (Prettier)

- Use single quotes
- No semicolons
- 2-space indentation
- Max line width: 80 characters
- No trailing commas
- No comments in code unless explicitly requested

### TypeScript

- Strict mode enabled
- Interfaces defined at bottom of files
- Allow `null | undefined` in interface properties when needed
- Type annotations: `ref<Type>()`, `Ref<Type>`, `computed<Type>()`

Example:

```ts
const count = ref<number>(0)
const user: Ref<UserInfo | undefined> = ref()
```

### Component Props

Use `defineProps` with TypeScript syntax:

```ts
defineProps<{ msg: string }>()
```

### Pinia Stores

Use setup syntax with `defineStore`:

```ts
export const useUsersStore = defineStore('users', () => {
  const userArr = ref<UserInfo[]>([])

  const addUser = (userInfo: UserInfo) => {
    userArr.value.push(userInfo)
  }

  return { userArr, addUser }
})
```

### Styling

- Use `<style lang="sass" scoped>` for component styles
- Indented Sass syntax (no braces, no semicolons)
- Tailwind CSS classes in templates for utility-first styling

### Testing

- Use `mountComponent` helper from `@test/unit/testhelper`
- Test structure: beforeEach/afterEach hooks, descriptive test names
- Use `describe` blocks for grouping related tests
- Async operations: use `await wrapper.vm.$nextTick()`

Example:

```ts
describe('HelloWorld.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof HelloWorld>>

  beforeEach(() => {
    wrapper = mountComponent(HelloWorld, { props: { msg: 'test' } })
  })

  test('should mount', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
```

### Naming Conventions

- Components: PascalCase (e.g., `SpecialNode.vue`)
- Variables/Functions: camelCase (e.g., `addUser`, `userArr`)
- Interfaces/Types: PascalCase, can use `I` prefix (e.g., `UserInfo`, `IUser`)
- Constants: UPPER_SNAKE_CASE (if applicable)
- CSS classes: kebab-case in custom styles

### Error Handling

- TypeScript strict mode catches most type errors
- Use type guards and optional chaining where needed
- For API calls, handle errors appropriately (not explicitly shown in codebase)

### Path Aliases

- `@/*` maps to `src/*`
- Always use `@/` for imports from src directory

### Global Components

- Register components via `@/components` module
- Auto-import configured for Ant Design Vue components

### Tech Stack Notes

- Primary UI: Naive UI, with Ant Design Vue, Element Plus, Vant available
- State management: Pinia (Composition API style)
- Router: Vue Router with lazy-loaded components
- Build tool: Vite with TypeScript
- Testing: Vitest (unit), Cypress (e2e)
