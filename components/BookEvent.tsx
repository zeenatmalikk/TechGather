'use client';

import { useState } from "react";
import posthog from "posthog-js";
import { createBooking } from "@/lib/actions/booking.actions";
import { IEvent } from "@/database";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const BookEvent = ({ eventId, slug, event }: { eventId: string, slug: string; event: IEvent }) => {
    const [email, setEmail] = useState('');
    const [duplicateEmail, setDuplicate] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { success, duplicate } = await createBooking({ eventId, slug, email });


        if (success) {
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, slug, email })
            // send mail
            // for testing purposes only
            // await fetch(`${BASE_URL}/api/send`, { method: 'POST', body: JSON.stringify({ email: email, event }) })
        } else {

            if (duplicate) {
                setDuplicate(true);
            }
            console.error('Booking creation failed')
            posthog.captureException('Booking creation failed')
        }
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ) : duplicateEmail ?
                <p className="text-sm text-red-500">Email already exists</p>
                : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                placeholder="Enter your email address"
                            />
                        </div>

                        <button type="submit" className="button-submit">Submit</button>
                    </form>
                )}
        </div>
    )
}
export default BookEvent