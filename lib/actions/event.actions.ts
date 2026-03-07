"use server";

import { Event } from "@/database";
import dbConnect from "../mongodb";

//all the code will be executed on the server side, so we can safely use server side code here like database connections, file system access etc.

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await dbConnect();
    const event = await Event.findOne({ slug });
    if (!event) return [];
    return await Event.find({
      _id: { $ne: event._id }, // Exclude the current event
      slug: { $ne: slug[0] }, // Exclude the current event
      //if any event we are fetching has the same slug as the current event, we should exclude it from the similar events list
      tags: { $in: event.tags }, // Find events with at least one matching tag
    }).limit(3).lean();
  } catch (error) {
    return [];
  }
};
