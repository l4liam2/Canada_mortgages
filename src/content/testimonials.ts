/**
 * Real client reviews from Chad's Google Business profile (24 reviews, all 5 stars),
 * copied on 2026-09-30 at his request. Quotes are verbatim; "..." marks where a longer
 * review was shortened. Names are shortened to first name and last initial.
 * Reviews from people who share Chad's surname are left out on purpose.
 * Ontario advertising rules require testimonials to be genuine and verifiable, so only
 * add new entries from real reviews.
 */
export type Testimonial = {
  name: string;
  detail: string;
  quote: string;
  rating: number;
  service: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Thomas D.",
    detail: "Home purchase, Google review",
    quote:
      "From start to finish, Chad was incredibly helpful, attentive, and patient. He took the time to clearly explain how the mortgage would work, which made the whole process feel much less overwhelming. ... Most importantly, he got us approved and helped turn what could have been a stressful process into a smooth and positive experience.",
    rating: 5,
    service: "Home purchase",
  },
  {
    name: "Brock S.",
    detail: "Refinance, Google review",
    quote:
      "Chad was a pure professional, beginning to end. He listened to my needs and handled the complications of my refinancing strategically, with diligence and always with a calm demeanor. He recommended the best product to suit my circumstances and negotiated the best rate possible.",
    rating: 5,
    service: "Refinance",
  },
  {
    name: "Carl M.",
    detail: "Renewal, Google review",
    quote:
      "Chad was incredible to work with. Very knowledgeable and responsive. He took great care of my mortgage renewal and got me a great rate. Highly recommend!",
    rating: 5,
    service: "Renewal",
  },
  {
    name: "Andrew G.",
    detail: "First-time buyer, Google review",
    quote:
      "He helped me secure a mortgage for my first home and negotiated a better rate for me. I found him to be patient, attentive, and an excellent communicator, which was very helpful given my lack of knowledge and experience with the mortgage world. ... He will go to bat for you and will get the job done.",
    rating: 5,
    service: "First-time purchase",
  },
  {
    name: "Riane T.",
    detail: "First-time buyers, Google review",
    quote:
      "When we first started considering a home purchase, he helped us determine a budget, explained the mortgage process and raised other things to consider (land transfer tax, appraisals, insurance, etc). When we were ready to make an offer, he built out various scenarios so that we had flexibility and would be prepared for any counteroffers/bidding wars.",
    rating: 5,
    service: "First-time purchase",
  },
  {
    name: "Taso B.",
    detail: "Two mortgages, Google review",
    quote:
      "Chad gives you a wholistic view of your financial picture and always explores all mortgage options available in the market for you. ... Chad helped me with 2 personal mortgages and I could not have been happier. Everything was super easy from start to finish and Chad was there every step of the way.",
    rating: 5,
    service: "Purchase and refinance",
  },
  {
    name: "Jordan B.",
    detail: "Condo refinance, Google review",
    quote:
      "Chad is knowledgeable, helpful, and a great resource. He guided me through the refinance on my condo and secured me a great competitive rate. It was an easy decision to recommend him to my friends and family.",
    rating: 5,
    service: "Refinance",
  },
  {
    name: "Taylor K.",
    detail: "New build condo, Google review",
    quote:
      "Chad's knowledge and expertise secured us an excellent rate for our new build condo with regular communication and updates along the way. Chad's guidance was clear and patient, making the process stress-free for us as first time lenders.",
    rating: 5,
    service: "New build",
  },
  {
    name: "Darran F.",
    detail: "Repeat client, Google review",
    quote:
      "Chad has supported me through two purchases over the last five years. He's helpful, knowledgeable, thoughtful and skilled in both supporting and educating his clients through their mortgage journey.",
    rating: 5,
    service: "Home purchase",
  },
  {
    name: "Patrick",
    detail: "First property, Google review",
    quote:
      "He basically held my hand through the entire process, helping me understand the ins and outs of getting a mortgage. Any time I had a question he was easy to reach and explained it in terms I could understand.",
    rating: 5,
    service: "First-time purchase",
  },
];
