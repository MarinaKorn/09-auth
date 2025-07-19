import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { serverApi } from '../../api'
import { parse } from 'cookie'

export async function GET() {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  try {
    if (accessToken) {
      const userRes = await serverApi.get('/users/me', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      })
      return NextResponse.json(userRes.data)
    }

    if (refreshToken) {
      const sessionRes = await serverApi.get('/auth/session', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      })

      const setCookie = sessionRes.headers['set-cookie']
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr)
          if (parsed.accessToken) {
            accessToken = parsed.accessToken
            cookieStore.set('accessToken', accessToken)
          }
          if (parsed.refreshToken) {
            cookieStore.set('refreshToken', parsed.refreshToken)
          }
        }

        if (accessToken) {
          const userRes = await serverApi.get('/users/me', {
            headers: {
              Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
            },
          })
          return NextResponse.json(userRes.data)
        }
      }
    }

    return NextResponse.json({}, { status: 200 })
  } catch {
    return NextResponse.json({}, { status: 200 })
  }
}