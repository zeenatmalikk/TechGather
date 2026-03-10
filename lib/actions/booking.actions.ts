"use server";

import Booking from "@/database/booking.model";

import connectDB from "@/lib/mongodb";
import Error from "next/error";
const { Resend } = await import("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (e:any) {
    console.error("create booking failed", e);
    if (e.code === 11000) {
      return {
        success: false,
        message: "You have already booked this event.",
        duplicate: true,
      };
    }
    return { success: false };
  }
};

