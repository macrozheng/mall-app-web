/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 是否使用支付宝支付（H5端启用） */
  readonly VITE_USE_ALIPAY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// uni-app page lifecycle hooks (used in Vue3 script setup)
declare function onNavigationBarSearchInputClicked(callback: () => void): void
declare function onNavigationBarButtonTap(callback: (e: { index: number }) => void): void
