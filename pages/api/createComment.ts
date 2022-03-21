import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../lib/client'
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, text, _id } = JSON.parse(req.body)
  client.create({
    _type: 'comment',
    name,
    text,
    email,
    post: {
      _ref: _id,
      _type: 'reference',
    },
  })
}
