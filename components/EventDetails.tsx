import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import BookEvent from './BookEvent';
import { IEvent } from '@/database';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';
import EventCard from './EventCard';
import { cacheLife } from 'next/cache';

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)
const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const EventDetails = async ({ params }: { params: Promise<string> }) => {
    'use cache'
    cacheLife('hours') // Cache the result of this function for 1 hour, so that if there are multiple requests to the same event page within 1 hour, it will serve the cached version instead of fetching the event details from the API again, improving performance and reducing load on the server.
    const slug = await params
    const response = await fetch(`${BASE_URL}/api/events/${slug}`)
    const { event } = await response.json()
    const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer } = event;

    if (!description) return notFound();
    const bookings = 10; // This should ideally come from the API, hardcoded for now

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug); // This should also come from the API based on the current event's tags or category, hardcoded for now

    return (
        <div>
            <section id="event">
                <div className="header">
                    <h1>Event Description</h1>
                    <p>{description}</p>
                </div>

                <div className="details">
                    {/*    Left Side - Event Content */}
                    <div className="content">
                        <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

                        <section className="flex-col-gap-2">
                            <h2>Overview</h2>
                            <p>{overview}</p>
                        </section>

                        <section className="flex-col-gap-2">
                            <h2>Event Details</h2>

                            <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                        </section>

                        <EventAgenda agendaItems={agenda} />

                        <section className="flex-col-gap-2">
                            <h2>About the Organizer</h2>
                            <p>{organizer}</p>
                        </section>

                        <EventTags tags={tags} />
                    </div>

                    {/*    Right Side - Booking Form */}
                    <aside className="booking">
                        <div className="signup-card">
                            <h2>Book Your Spot</h2>
                            {bookings > 0 ? (
                                <p className="text-sm">
                                    Join {bookings} people who have already booked their spot!
                                </p>
                            ) : (
                                <p className="text-sm">Be the first to book your spot!</p>
                            )}

                            <BookEvent eventId={event._id} slug={event.slug} event={event} />
                        </div>
                    </aside>
                </div>

                <div className="flex w-full flex-col gap-4 pt-20">
                    <h2>Similar Events</h2>
                    <div className="events">
                        {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                            <EventCard key={similarEvent.title} {...similarEvent} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EventDetails