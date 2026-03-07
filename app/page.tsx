import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database'
import { cacheLife } from 'next/cache'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const page = async () => {
  'use cache';
  cacheLife('hours') // Cache the result of this function for 60 seconds, so that if there are multiple requests to the homepage within 60 seconds, it will serve the cached version instead of fetching the events from the API again, improving performance and reducing load on the server.
  
  const response = await fetch(`${BASE_URL}/api/events`)
  const { events } = await response.json()
  
  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Featured events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page