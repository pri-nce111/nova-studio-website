# Nova Studio: Multi-page Business Website

A complete, responsive, multi-page website built with plain HTML, CSS and JavaScript. No build tools or dependencies required.

## Pages
- `index.html`: Home (hero, stats counters, services, process, testimonials, CTA)
- `about.html`: Story, values, team, FAQ accordion
- `services.html`: Services and pricing
- `portfolio.html`: Filterable project gallery
- `contact.html`: Contact form with validation
- `404.html`: Custom not-found page

## Features
- Fully responsive (mobile menu included)
- Dark / light mode, saved in the browser
- Scroll-reveal animations and animated counters
- Portfolio category filter
- FAQ accordion
- Contact form validation
- Back-to-top button

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Deploy on GitHub Pages
1. Create a new repository on GitHub.
2. Upload all files (or run the commands below).
3. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

```bash
git init
git add .
git commit -m "Initial commit: Nova Studio website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Customize
- Brand name, text and contact details: edit the HTML files.
- Colors: change the CSS variables at the top of `style.css`.
- Contact form: it is a demo. Connect it to [Formspree](https://formspree.io) or Netlify Forms by setting the form `action` and removing the demo logic in `main.js`.

## License
MIT. Free to use and modify.
