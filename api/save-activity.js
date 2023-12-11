import { formatDateTime } from '../utils'

export default async (request, env) => {
  try {
    const data = await request.json()
    const activityId = await insertActivity(data, env)

    for (const route of data.routes) {
      await insertRoute(activityId, route, env)
    }
    for (const location of data.locations) {
      await insertLocation(activityId, location, env)
    }
  
    return new Response('succuss', { status: 200 })
  } catch(e) {
    console.error(e.toString())
    return new Response(e.toString(), { status: 500 })
  }
}

async function insertActivity(data, env) {
  const uuid = crypto.randomUUID()

  await env.DB.prepare(
    `
      INSERT INTO activities (id, create_time, title, activity_des, activity_date, link)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6)
    `
  )
  .bind(
    uuid,
    formatDateTime(new Date()),
    data.activity_title,
    data.activity_description,
    data.activity_date,
    data.activity_link
  )
  .run()

  return uuid
}

async function insertRoute(actId, data, env) {
  const uuid = crypto.randomUUID()
  await env.DB.prepare(
    `
      INSERT INTO routes (id, activity_id, create_time, trip_mode, duration, distance, coordinates)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
    `
  )
  .bind(
    uuid,
    actId,
    formatDateTime(new Date()),
    data.mode,
    data.duration,
    data.distance,
    data.coordinates
  )
  .run()

  return uuid
}

async function insertLocation(actId, data, env) {
  const uuid = crypto.randomUUID()
  await env.DB.prepare(
    `
      INSERT INTO locations (id, activity_id, create_time, location_name, tag, coordinates)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6)
    `
  )
  .bind(
    crypto.randomUUID(),
    actId,
    formatDateTime(new Date()),
    data.name,
    data.tag,
    data.coordinates
  )
  .run()

  return uuid
}
