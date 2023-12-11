export default async (request, env) => {
  try {
    let result = {
      activities: {},
      routes: [],
      locations: [],
    }

    // activities
    const activitiesData = await env.DB.prepare('SELECT * FROM activities').all()
    for (const item of activitiesData.results) {
      result.activities[item.id] = {
        title: item.title,
        activity_des: item.activity_des,
        activity_date: item.activity_date,
        link: item.link,
      }
    }
    
    // routes
    const routesData = await env.DB.prepare('SELECT * FROM routes').all()
    for (const item of routesData.results) {
      result.routes.push({
        activity_id: item.activity_id,
        trip_mode: item.trip_mode,
        duration: item.duration,
        distance: item.distance,
        coordinates: item.coordinates,
      })
    }

    // locations
    const locationsData = await env.DB.prepare('SELECT * FROM locations').all()
    for (const item of locationsData.results) {
      result.locations.push({
        activity_id: item.activity_id,
        location_name: item.location_name,
        tag: item.tag,
        coordinates: item.coordinates,
      })
    }
  
    return Response.json(result, { status: 200 })
  } catch(e) {
    console.error(e.toString())
    return new Response(e.toString(), { status: 500 })
  }
}
