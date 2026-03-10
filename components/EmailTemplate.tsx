import { IEvent } from "@/database";

interface IEmailTemplateProps {
    email: string;
    event: IEvent;
}


const EmailTemplate = async ({ email, event }: IEmailTemplateProps) => {
    const { title, date, location } = event
    return (
        <div className="gap-3">
            <h3>Hey {email},</h3>
            <p className="mt-2"> Thank you for booking your spot at our event! We're excited to have you join us.</p>
            <p className="mt-2">Here are the details of your booking:</p>
            <ul className="list-none mt-2">
                <li><strong>Event:</strong> {title}</li>
                <li><strong>Date:</strong> {date}</li>
                <li><strong>Location:</strong> {location}</li>
            </ul>
            <p className="mt-3">We look forward to seeing you at the event!</p>
            <p className="mt-3">Best regards,<br />The Event Team</p>
        </div>
    );
}

export default EmailTemplate;