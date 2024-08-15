// global.d.ts

// Extend the Window interface to include the finSdk property
interface Window {
  finSdk: any // Use the appropriate type instead of 'any' if you know the type of finSdk
}
declare namespace JSX {
  interface IntrinsicElements {
    'dotlottie-player': any
  }
}
// Ensure TypeScript recognizes the changes
declare let window: Window
