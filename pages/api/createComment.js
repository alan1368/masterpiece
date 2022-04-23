import client from '../../lib/client'
export default async function createComment(req, res) {
  const { name, email, text, _id } = JSON.parse(req.body)
  client?.create({
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
