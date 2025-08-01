export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { serverApi } from '../../api'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  try {
    const { data } = await serverApi.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    if (data) return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies()
    const body = await request.json()
    const accessToken = cookieStore.get('accessToken')?.value
    const refreshToken = cookieStore.get('refreshToken')?.value

    const { data } = await serverApi.patch('/users/me', body, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    })

    if (data) return NextResponse.json(data)

    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}