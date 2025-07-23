# Weather Dashboard – Machine Round Task

## Overview
Design and build a responsive Weather Dashboard using **Figma** (UI/UX) and **Next.js** (development). The dashboard visualizes weather and soil metrics in a clean, modern, single-page layout.

- **No scrolling** on desktop (all data fits on one screen)
- **Auto-refreshes every 1 hour** (graphs update without page reload)
- Powered by a **free weather API** or **mocked static data**

---

## Features

- **Location Name** (e.g., "New York, USA")
- **Current Date** (e.g., "June 2, 2025")
- **Summary Box**:
    - Current temperature
    - Current rainfall
- **Graphs (last 7 days, daily data points):**
    - Temperature
    - Rainfall
    - Soil Temperature
    - Soil Moisture

---

## Data & Refresh

- Uses a free weather API (or static mocked data if unavailable)
- API/data **refreshes every 1 hour** (randomized static data on reload)
- **Graphs and UI update automatically** (no page reload)

---

## Design (Figma)

- Visually clean, modern, and easy to understand
- Component-based design (reusable blocks)
- [Figma Design Link](#) <!-- Replace with your Figma link -->

---

## Development (Next.js)

- Built with **Next.js**
- UI framework: _Tailwind CSS / Chakra UI / Material UI_ (choose one)
- Charting library: _Chart.js / Recharts / ApexCharts_ (choose one)
- Component-based architecture
- Environment variable support for APIs
- Well-commented, maintainable code

---

## Folder Structure

```
/weather-dashboard
    /components
    /pages
    /styles
    /utils
    /public
    README.md
```
---

## API Integration

- Prefer a free weather API
- If unavailable:
    - API fetch logic is commented out
    - Static mock data returned
- Data auto-refreshes every 1 hour (UI updates without reload)

---

## Submission Checklist

- [ ] Figma link to final design
- [ ] GitHub repository

---

## Getting Started

1. Clone the repo
2. Install dependencies
3. Add your API key (if available) to `.env.local`
4. Run the development server

```bash
npm install
npm run dev
```

---

## License

MIT
