import { useCallback, useMemo } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import { PATH_PUBLIC_APP } from '~/constants/paths'
import { BaseLayout } from '~/layouts/baseLayout'

import { SimpleLayout } from '~/layouts/simpleLayout'
import { Analysis } from '~/pages/analysis'

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
        element: <BaseLayout />,
        children: [
          {
            index: true,
            path: removeSlash(PATH_PUBLIC_APP.home),
            element: <Home />
          }
        ]
      },
      {
        path: '',
        element: <SimpleLayout />,
        children: [
          {
            index: true,
            path: removeSlash(PATH_PUBLIC_APP.analysis),
            element: <Analysis />
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
