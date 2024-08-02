import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { store } from '~/redux/configStore.ts'
import { setupAxiosClient } from './api/axiosClient.ts'
import App from './App.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Theme>
        <App />
      </Theme>
    </Provider>
  </BrowserRouter>
)

setupAxiosClient()
