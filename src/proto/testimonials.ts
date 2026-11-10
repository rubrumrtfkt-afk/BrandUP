// brief-v4.5 §11: the testimonials, back between the FAQ and the final form.
// CLIENT CONTENT, TO BE CONFIRMED BY THE OWNER (brief §11.5): copied VERBATIM from src/Testimonials.tsx (the live site's
// component, which this round may not touch, so it cannot export them; the brief asked for a shared module: when the
// redesign ships, src/Testimonials.tsx should import THIS array instead of holding its own). The four quotes speak of
// restaurants while the page now speaks to businesses in general: never rewrite or invent a testimonial; the owner
// replaces them or confirms they stay. Diff of the text against src/Testimonials.tsx = 0 (proto-v51/tools/testi-diff.py).
export const testimonialsHead = { h2: ['In their own words.', 'In their own businesses.'], intro: 'The people, the everyday challenges, and what working with BrandUp means to them.' }
export const testimonials: { name: string; initials: string; quote: string }[] = [
  {
    name: 'Michael Bennett',
    initials: 'MB',
    quote: 'I used to finish a full day at the restaurant and still have to figure out what to post. Most nights, I just didn’t have the energy. Since working with BrandUp, our content feels more consistent and actually reflects the care we put into our food. For me, the biggest difference is being able to head home without feeling like I’ve left another job unfinished.',
  },
  {
    name: 'Sofia Mitchell',
    initials: 'SM',
    quote: 'We’ve always been proud of what comes out of our kitchen, but our online presence never quite matched it. BrandUp took the time to understand our food, our customers, and the atmosphere we’ve worked hard to create. When I look at our page now, I recognize our restaurant in it. That might sound like a small thing, but when you’ve built a business from scratch, it means a lot.',
  },
  {
    name: 'Daniel Carter',
    initials: 'DC',
    quote: 'Before BrandUp, I would put money into ads and hope for the best. I knew we needed marketing, but I couldn’t really explain what we were doing or why. Their team walked me through the plan and made room for my questions. Having someone explain the decisions in plain language has made me feel much more involved and comfortable with the process.',
  },
  {
    name: 'Emily Parker',
    initials: 'EP',
    quote: 'Our menu had grown over the years, and we’d kept adding dishes without thinking much about the layout. It had become a lot to take in. BrandUp helped us organize it and give the dishes we’re most proud of the attention they deserved. The first time I held the new version, I thought, ‘This finally feels like our restaurant.’ It was a change we’d put off for too long.',
  },
]
