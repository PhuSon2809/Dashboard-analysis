import { useCallback, useMemo } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import { PATH_PUBLIC_APP } from '~/constants/paths'

import { SimpleLayout } from '~/layouts/simpleLayout'

import { Home } from '~/pages/home'

function useRouteElements() {
  const removeSlash = useCallback((path: string) => (path.startsWith('/') ? path.slice(1) : path), [])

  const routes = useMemo(
    () => [
      {
        path: '/',
        element: <Navigate to={'/'} />
      },
      {
        path: '',
        element: <SimpleLayout />,
        children: [
          {
            index: true,
            path: removeSlash(PATH_PUBLIC_APP.home),
            element: <Home />
          }
        ]
      }
    ],
    []
  )

  const routeElements = useRoutes(routes)

  return routeElements
}

export default useRouteElements
