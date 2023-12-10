export default async (request) => {
  let json = await request.json()
  console.log(json)

  // add status
  return new Response('succuss')
}
