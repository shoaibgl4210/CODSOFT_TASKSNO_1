# Al-Azhar Classes – JEE & NEET Coaching Website

A responsive, single-page landing website for **Al-Azhar Classes**, designed to introduce its JEE and NEET preparation programs.

## Project files

```text
al-azhar-classes/
├── index.html   # Page structure and content
├── style.css    # Layout, colors, animations, and responsive styles
├── script.js    # Mobile navigation, FAQ accordion, scroll reveal, and enquiry form
└── README.md    # Project documentation
```

## Run locally

1. Download or clone this repository.
2. Keep all four files in the same folder.
3. Open `index.html` in a modern browser.

No build tools or package installation are required.

## Before publishing

Update the placeholder institute details in `index.html` and `script.js`:

- `+91 XXXXX XXXXX` – institute phone number
- `your-email@example.com` – institute email address
- `Your Institute Address, City` – institute address
- `91XXXXXXXXXX` in `script.js` – WhatsApp number in international format, digits only
- Replace placeholder results and sample student testimonials with verified information.
- Replace the `#` social links with the institute's real social profile URLs.

**Important:** The enquiry form opens WhatsApp with a pre-filled message. It does not store submissions on a server. The WhatsApp number must be configured for the form to work.

## Publish with GitHub Pages

1. Create a new repository on GitHub (for example, `al-azhar-classes`).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to deploy, then open the published URL shown in the Pages section.

## External resources

The page loads Google Fonts (Inter) and Font Awesome icons from their respective CDNs, so an internet connection is needed for those assets.

## License

Add a license file if you intend to distribute or reuse this project under a specific license.
