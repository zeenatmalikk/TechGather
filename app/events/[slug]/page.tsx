import EventDetails from '@/components/EventDetails';
import Image from 'next/image';
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = params.then((p) => p.slug);


  return (
    <section id='event'>
      <Suspense fallback={<div>Loading...</div>}>

        <EventDetails params={slug} />
      </Suspense>
    </section>
  )
}

export default EventDetailsPage