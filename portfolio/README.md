# Vishwanathan R â€” Portfolio

A responsive Next.js 15 App Router portfolio built with TypeScript, Tailwind CSS v4, lucide-react and next/font. All biographical and project content is based on the supplied one-page resume. Phone number intentionally omitted. No unsupported project metrics, work history, hackathons, or project URLs are fabricated.

## Run locally

1. Install Node.js 20.9 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev -- -p 2000` and open http://localhost:2000.
4. Run `npm run build` to verify a production build; `npm start` serves it after building.

## Deploy free on Vercel

1. Create a GitHub repository and push this folder's contents.
2. Sign in to Vercel with GitHub and choose **Add New â†’ Project**.
3. Import the repository. Vercel detects Next.js automatically; keep the default build command `next build` and output settings.
4. Select **Deploy**. The free Hobby tier is suitable for a personal portfolio; check Vercel's current plan terms for usage limits.

## Animation controls

- Dock: Pause/Resume, Agents On/Off, Tour.
- Keyboard: `P` pause, `A` toggle agents, `T` start tour, `Esc` stop tour.
- `?agents=on` forces agent animation; `?agents=off` disables it.
- Agent preference is stored in localStorage.

## Content notes

- Project live/code links were not included because none were present in the supplied resume.
- The resume lists three projects, two completed certificates, and one currently pursued Generative AI course.
- The timeline contains education only; the resume did not list employment or hackathon history.

