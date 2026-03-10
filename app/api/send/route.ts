import EmailTemplate from '@/components/EmailTemplate';
import posthog from 'posthog-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
      const mailData = await req.json();
      console.log(mailData, "////req body");
  
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: mailData.email, 
        subject: `Booking Confirmation for ${mailData.eventTitle}`,
        react: EmailTemplate({ email: mailData.email, event: mailData.event }),
      });

      posthog.capture('event_booked', { eventData: mailData.event });
      if (error) {
        console.log(error, "////error in resend api");
        return Response.json({ error }, { status: 500 });
      }
  
      return Response.json(data);
    } catch (error) {
        console.log(error,'////error in send api route');
      return Response.json({ error }, { status: 500 });
    }
  }