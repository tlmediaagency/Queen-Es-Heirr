// Starting-point agreement text for booking invoices, by service type. These are templates for LyKinda to edit, not legal advice:
// have a Louisiana attorney review them before relying on them. Format: "## Heading" lines and "- bullet" lines.
export const KINDS = [
  ["keynote", "Keynote or speaking engagement"],
  ["workshop", "Workshop or training (etiquette, leadership)"],
  ["making", "Hands-on making (jam making, etiquette dining)"],
  ["stem", "STEM program"],
  ["other", "Other"],
];
export const NEEDS_PARTICIPANTS = ["making", "stem"];   // these must tell us about allergies and ages before paying
const L = (...lines) => lines.join("\n");
const sec = (title, items) => "## " + title + "\n" + items.map((x) => "- " + x).join("\n");

const GENERAL = [
  sec("Booking and payment", [
    "Your payment holds the date and our team for your event. Amounts and due dates are shown on your invoice.",
    "To reschedule, tell us at least 14 days before the event and we will gladly move you to another available date at no charge.",
    "Cancellations less than 14 days before the event, and no-shows, are non-refundable because the date was held for you.",
    "If we must cancel for illness, weather or an emergency, we will reschedule at no cost or refund what you paid for services not delivered.",
    "The event details in this invoice are our shared understanding. Please tell us right away if anything is wrong or changes. Extra time, travel or services you request later are billed separately.",
  ]),
  sec("Goals, not guaranteed results", [
    "Nothing we offer comes with guaranteed results. Our programs have goals and expectations, and what each participant gets from them varies with their own knowledge, experience, effort and circumstances.",
    "What we share is educational and general. It is not legal, HR, medical, financial or other professional advice.",
  ]),
  sec("Safety, release and limits of liability", [
    "We carry out every service using careful safety procedures, and we ask your group to follow our instructions.",
    "To the fullest extent permitted by law, you, for yourself, your organization and the participants you bring, agree that Queen E's Heirr and its owner, employees, facilitators and speakers are not responsible for injury, illness, loss or damage connected to the services, including claims of ordinary negligence. This does not apply to gross negligence or intentional misconduct, which the law does not allow anyone to waive.",
    "Participation is voluntary. You are responsible for telling participants (and the parents or guardians of any minors) about these terms and for getting any consent your organization requires.",
    "To the extent permitted by law, our total liability for any claim is limited to the amount you paid for the service involved.",
    "You are responsible for providing a safe and suitable space and for any permits, permissions or venue rules. We are not responsible for your property or your venue's property.",
  ]),
  sec("Photos and media", [
    "With your permission, we may take photos or video at the event for our own promotion. Tell us before the event if you do not allow this. We will not share identifiable images of minors without approval from your organization.",
  ]),
  sec("General", [
    "We are an independent contractor, not an employee or agent of your organization.",
    "Our materials, content and recordings remain our property. You may use them for the event but may not copy or share them without written permission.",
    "This agreement is governed by Louisiana law, and any dispute will be handled in St. Tammany Parish, Louisiana.",
    "Checking the agreement box and typing your name below is your electronic signature, and it has the same effect as signing on paper. You confirm you are authorized to agree for your organization.",
    "If any part of this agreement is found unenforceable, the rest still applies. This agreement and your invoice are our entire agreement for this event. Changes must be in writing (email is fine).",
  ]),
].join("\n\n");

const SPECIFIC = {
  keynote: sec("Keynote and speaking engagements", [
    "Your speaker arrives 45 to 60 minutes early for a sound check. Please provide a working microphone, and a projector and screen if slides are used. Tell us your technical needs at least 7 days before the event.",
    "The program length is the time shown on your invoice. Going over that time, or adding sessions, is billed separately.",
    "Recording, live-streaming, rebroadcasting or reproducing the keynote or slides requires our written permission.",
    "The speaker's views are her own. Her appearance is not an endorsement of any organization, product, candidate or position.",
    "Travel, parking and lodging are as agreed on your invoice. Please arrange safe, direct access to the stage and a place for our book table if you ordered books.",
    "If the setting becomes unsafe, the speaker may stop the program and leave.",
  ]),
  workshop: sec("Workshops and training", [
    "Please send your estimated attendance now and your final headcount at least 7 days before. We prepare materials for that number, and increases within 7 days may be billed or may not be accommodated.",
    "Participants may use the workbooks and handouts for their own learning, but may not copy or share them.",
    "Participants are expected to engage respectfully. We may pause or end the session if it becomes disruptive or unsafe.",
    "Please provide a suitable room, seating and the technology listed on your invoice.",
  ]),
  making: sec("Hands-on food making (jam making and etiquette dining)", [
    "Allergy and dietary information is required. You will tell us about every known food allergy, dietary restriction and medical concern among your participants, with a participant list, at least 7 days before the event. We cannot accommodate what we are not told.",
    "Our ingredients, equipment and kitchen may contain or touch wheat, milk, eggs, soy, peanuts, tree nuts, fruit and other allergens. We cannot guarantee an allergen-free environment. Participants with serious allergies take part at their own discretion and on the advice of their doctor.",
    "These activities involve hot surfaces and liquids, hot sugar mixtures, glass jars and sharp tools. Participants must follow our instructions, wash their hands, wear closed-toe shoes and tie back long hair. We may remove anyone from an activity who is not following safety instructions.",
    "Minors must be supervised by adults from your organization throughout the session, at least 1 adult for every 10 participants, and more for younger children.",
    "Food made at the event is enjoyed or taken home at each participant's own risk. Please follow the storage and handling directions we give.",
    "Please provide a clean workspace with sturdy tables, running water and electrical outlets, as listed on your invoice.",
  ]),
  stem: sec("STEM and hands-on learning", [
    "Please tell us the number and ages of participants, any accommodations needed, and any allergies (such as latex) at least 7 days before the event.",
    "An adult from your organization must be present with the group throughout, at least 1 adult for every 10 participants, and more for younger students. You are responsible for your school or organization's own supervision and consent requirements.",
    "Some activities use small parts, heat, tools or materials that need careful handling. Participants must follow instructions and use any safety gear provided. We may remove anyone from an activity who is not following safety instructions.",
    "Please provide sturdy tables, electrical outlets and access to water as listed on your invoice. If your school or district has policies we should follow, send them to us in advance.",
    "Learning varies by student. We cannot promise any particular score, skill level or outcome.",
  ]),
  other: "",
};

export const termsFor = (kind) => [GENERAL.split("\n\n")[0], SPECIFIC[kind] || "", ...GENERAL.split("\n\n").slice(1)].filter(Boolean).join("\n\n");

const bl = (...x) => x.map((y) => "- " + y).join("\n");
export const EXPECT = {
  keynote: bl("Your speaker arrives about 45 to 60 minutes before the program for a sound check and a walk-through of the room.", "The program runs for the time on this summary, with time for audience questions unless we agreed otherwise.", "If you ordered workbooks, we bring them on event day and can arrange a book signing afterward.", "After the event we send a thank-you note and a feedback link, and we are glad to talk about a follow-up session."),
  workshop: bl("We arrive early to set up and welcome your group.", "Participants learn through short lessons, discussion and practice activities, with printed materials for each person.", "We wrap up with takeaways and next steps, and we send a thank-you note and a feedback link afterward."),
  making: bl("We arrive early to set up cooking stations and review safety rules with your group.", "Participants make their own jars or dishes with guided, hands-on instruction, and we share the etiquette and conversation that goes with it.", "We clean up with your help, and send a thank-you note and feedback link afterward."),
  stem: bl("We arrive early to set up stations and review safety rules with the group.", "Students work in small teams on guided, hands-on activities and discuss what they notice and learn.", "We wrap up with a recap, and send a thank-you note and feedback link afterward."),
  other: bl("We will confirm the plan for the day with you before the event.", "After the event we send a thank-you note and a feedback link."),
};
export const NEED = {
  keynote: bl("A named on-site contact with a cell phone number we can reach on event day.", "Arrival and load-in time, parking and entry instructions, and the room or stage location.", "Room setup: seating, a microphone, and a projector and screen (HDMI) if slides are used.", "A short introduction for the speaker and the name of the person who will introduce her.", "Your final headcount at least 7 days before the event.", "Your photo and recording policy.", "Bottled water at the lectern and a place for a book table if you ordered books."),
  workshop: bl("A named on-site contact with a cell phone number we can reach on event day.", "Arrival and load-in time, parking and entry instructions, and the room location.", "Seating, tables and any technology listed on your invoice.", "Your final headcount at least 7 days before the event.", "Your photo and recording policy."),
  making: bl("The participant list with every allergy, dietary restriction and medical concern, at least 7 days before the event.", "The ages of participants and the names of the supervising adults for any minors.", "A named on-site contact with a cell phone number we can reach on event day.", "A clean workspace with sturdy tables, running water and electrical outlets, and early access for setup.", "Your final headcount at least 7 days before the event.", "Your photo and recording policy."),
  stem: bl("The number and ages of participants, any accommodations, and any allergies (such as latex), at least 7 days before the event.", "The names of the supervising adults, and any school or district policies we should follow.", "A named on-site contact with a cell phone number we can reach on event day.", "Sturdy tables, electrical outlets and access to water, and early access for setup.", "Your final headcount at least 7 days before the event.", "Your photo and recording policy."),
  other: bl("A named on-site contact with a cell phone number we can reach on event day.", "Arrival time, parking and entry instructions, and the location.", "Your final headcount at least 7 days before the event."),
};
export const EXTRA_TERMS = [
  "## Additional services and charges",
  "- This invoice is for additional time, travel, materials or services connected to the event named on it, as agreed with Queen E's Heirr or reasonably incurred because of it.",
  "- Payment is due on receipt. Once paid it is non-refundable unless we agree otherwise in writing.",
  "- All terms of your original booking agreement, including the limits on liability, continue to apply to these additional services.",
  "- Please reply to the invoice email before paying if anything looks wrong, and we will correct it.",
].join("\n");
