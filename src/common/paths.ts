import { path } from '~/utils/path'

const ROOTS_ERROR = '/error'

export const PATH_ERROR = {
  noPermission: path(ROOTS_ERROR, '/403'),
  notFound: path(ROOTS_ERROR, '/404'),
  serverError: path(ROOTS_ERROR, '/500')
}

export const PATH_PUBLIC_APP = {
  home: '/'
}
