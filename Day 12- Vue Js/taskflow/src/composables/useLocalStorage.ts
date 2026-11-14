import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useLocalStorage<T>(key: string, initial: T): Ref<T> {
  const raw = localStorage.getItem(key)
  const state = ref(raw === null ? initial : (JSON.parse(raw) as T)) as Ref<T>

  watch(
    state,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true }
  )

  return state
}
