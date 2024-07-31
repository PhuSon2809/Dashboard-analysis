import { Toaster } from 'react-hot-toast'

import useRouteElements from '~/hooks/useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return (
    <>
      {routeElements}

      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: '0px solid #ffffff',
              color: '#ffffff',
              background: 'linear-gradient(270deg, #5495FC 0%, #31D366 100%)'
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#60EC8E'
            }
          }
        }}
      />
    </>
  )
}

export default App
