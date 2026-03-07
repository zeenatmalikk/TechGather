import EventDetails from '@/components/EventDetails';
import Image from 'next/image';
import { notFound } from 'next/navigation'
import React from 'react'

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
  const slug = params.then((p) => p.slug);


  return (
    <section id='event'>

      <EventDetails params={slug}/>
    </section>
  )
}

export default EventDetailsPage