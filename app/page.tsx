import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database'

// const events = [
//   {
//     image: '/images/event1.png',
//     title: 'Hack the Future 2024',
//     slug: 'event-1',
//     location: 'location-1',
//     date: 'date-1',
//     time: 'time-1'
//   },
//   {
//     image: '/images/event2.png',
//     title: 'AI Innovators Summit',
//     slug: 'event-1',
//     location: 'location-1',
//     date: 'date-1',
//     time: 'time-1'
//   },
//   {
//     image: '/images/event3.png',
//     title: 'AI Innovators Summit',
//     slug: 'event-1',
//     location: 'location-1',
//     date: 'date-1',
//     time: 'time-1'
//   },
//   {
//     image: '/images/event4.png',
//     title: 'AI Innovators Summit',
//     slug: 'event-1',
//     location: 'location-1',
//     date: 'date-1',
//     time: 'time-1'
//   },
//   {
//     image: '/images/event5.png',
//     title: 'AI Innovators Summit',
//     slug: 'event-1',
//     location: 'location-1',
//     date: 'date-1',
//     time: 'time-1'
//   },
//   {
//     image: '/images/event6.png',
//     title: 'AI Innovators Summit',
//     slug: 'event-1',
//     location: 'location-1',
//     date: 'date-1',
//     time: 'time-1'
//   },
// ]
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const page = async () => {
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