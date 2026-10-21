# SS Garden website

Static Next.js site for SS Garden, a building developer in Dhaka. The build output is plain files for cPanel shared hosting.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server (form submits are mocked) |
| `npm run build` | Builds the site into `out/` |
| `npm test` | Unit tests (filters, validation, data, copy rules) |
| `npm run assets:horde -- <filter>` | Generate Stable Horde candidates into `.cache/horde` |
| `npm run assets:promote -- <image src> <n>` | Copy candidate `n` into `public/images` (on Git Bash prefix with `MSYS_NO_PATHCONV=1`) |
| `npm run assets:openverse` | Fetch Openverse photos and credits |
| `npm run assets:plans` | Regenerate the schematic floor plans |
| `npm run assets:placeholders -- --check` | List image slots that still have no real image |

Every image on the site is listed in `src/data/image-plan.ts` with its source and prompt.

## Deploy to cPanel

1. Open `public/api/enquiry.php` and set `$TO` to the inbox that should receive enquiries.
2. Run `npm run build`.
3. In cPanel File Manager, open `public_html` and upload the contents of the `out/` folder (including the hidden `.htaccess` file).
4. Turn on SSL in cPanel (AutoSSL) and visit the site over `https://`.
5. Send a test enquiry from the contact page and confirm it arrives. If it lands in spam, ask the host to enable SPF/DKIM for the domain.

The site does not need Node.js on the server. The enquiry script needs PHP 8.0 or newer (choose it in cPanel's MultiPHP Manager).

## Add or edit a project

Edit `src/data/projects.ts`: add one entry with its slug, address, status, type, specs, story, concept and images. Add the matching image slots in `src/data/image-plan.ts`, put the real images in `public/images/projects/<slug>/`, and rebuild.

## Sample content to replace before launch

- `src/data/site.ts`: address, phone, email, Facebook link, map coordinates
- `src/data/projects.ts`: all six projects, specs, addresses and descriptions are samples
- `src/data/testimonials.ts`: sample quotes and names
- `src/app/about/page.tsx`: sample team
- `src/components/home/CommitmentStack.tsx`: each commitment must be confirmed as true for the company
- `public/images/**`: all images are AI-generated or free-licence demos. Replace with real project photos and renders. Credits for third-party photos are in `CREDITS.md` and the site footer.
- `public/api/enquiry.php`: recipient address
- The logo tagline in `icon.jpg` mentions landscaping; the site uses only the leaf mark.
