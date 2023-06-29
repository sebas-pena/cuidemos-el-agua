import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { ErrorResponse } from './utils/server/http-errors'

const PRIVATE_ROUTES_POST = [
  'leak',
  /^user\/[^/]+\/(ban|unban|)$/,
]

const PRIVATE_ROUTES_PUT = [
  /^leak\/[^/]+\/(close|report|reopen)$/,
  /^user\/[^/]+\/(ban|unban|delete|)$/,
]

const PRIVATE_ROUTES_GET = [
  /^user\/(me)$/,
]

const PRIVATE_ROUTES_DELETE = [
  /^leak\/[^/]+$/,
]

const PRIVATE_ROUTER = {
  POST: PRIVATE_ROUTES_POST,
  PUT: PRIVATE_ROUTES_PUT,
  GET: PRIVATE_ROUTES_GET,
  DELETE: PRIVATE_ROUTES_DELETE,
}

const removeApiVersion = (pathname) => {
  return pathname.replace(/^\/api\/v\d\//, '')
}

const removeQueryParams = (pathname) => {
  return pathname.split('?')[0]
}

const isPrivateRoute = (pathname, method) => {
  const cleanPathname = removeQueryParams(removeApiVersion(pathname))
  const routes = PRIVATE_ROUTER[method]
  if (!routes) return false
  return routes.some((route) => {
    if (typeof route === 'string') {
      return cleanPathname === route
    } else {
      return route.test(cleanPathname)
    }
  })
  /* if (method === 'POST') {
    return PRIVATE_ROUTES_POST.some((route) => {
      console.log(cleanPathname)
      if (typeof route === 'string') {
        return cleanPathname === route
      } else {
        return route.test(cleanPathname)
      }
    })
  } else if (method === 'GET') {
    return PRIVATE_ROUTES_GET.some((route) => {
      if (typeof route === 'string') {
        return cleanPathname === route
      } else {
        return route.test(cleanPathname)
      }
    })
  } */
}

export async function middleware(req) {
  try {
    const { pathname } = new URL(req.url)
    console.log(pathname)
    if (!isPrivateRoute(pathname, req.method)) {
      return NextResponse.next()
    }

    const requestHeaders = new Headers(req.headers)
    const token = req.cookies.get('auth-token')

    if (token) {
      try {
        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET))
        requestHeaders.set('uid', payload.id)

        if (payload.banned) return ErrorResponse(3)

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      } catch (e) {
        return ErrorResponse(1)
      }
    } else {
      return ErrorResponse(2)
    }

  } catch (e) {
    return ErrorResponse(0)
  }
}

export const config = {
  matcher: '/api/:path*',
}