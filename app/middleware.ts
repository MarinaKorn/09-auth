import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.has('token')
  const isAuth = Boolean(token)
  const { pathname } = request.nextUrl

  const isPrivatePage = pathname.startsWith('/notes') || pathname.startsWith('/profile')
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  if (!isAuth && isPrivatePage) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}
