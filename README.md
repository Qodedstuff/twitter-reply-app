# AI Twitter Reply App

A batch AI reply generator for X (Twitter) — paste up to 10 tweet links or texts, pick a tone, and get natural, ready-to-post replies generated in one click.

## What it does

- Provides 10 input rows, each accepting either a tweet link or pasted tweet text
- Fetches tweet content automatically from a pasted link (via Twitter's oembed and syndication endpoints), with manual text entry as a fallback
- Generates all 10 replies in one action, in a selected tone (Witty, Professional, Supportive, or Casual)
- Per-row controls: **Reload** to regenerate a fresh variation, **Copy** to clipboard, or **Send** to open X's reply composer pre-filled with the generated reply
- Replies come back clean — no hashtags, emojis, or quotation marks — and stay under 280 characters
- Status indicators per row show fetch/generation progress and errors (timeouts, fetch failures, rate limits)

## Tech stack

- **Frontend:** HTML/JS
- **Backend:** Netlify serverless function (`netlify/functions/aiReply.js`)
- **AI:** Groq API — Llama 3.3 70B Versatile
- **Deployment:** Netlify

## How it works

1. User pastes tweet links and/or text into any of the 10 rows and picks a tone
2. On **Generate All**, each row's tweet text is fetched (if only a link was given) via Twitter's oembed/syndication endpoints
3. The tweet text is sent to the `aiReply` Netlify function, which prompts Groq's Llama 3.3 70B for a short, tone-matched reply
4. The AI response is cleaned server-side (hashtags, emojis, and quotes stripped) and returned
5. User can copy the reply, regenerate a new variation, or hit **Send** to open X's reply intent with the text pre-filled

## Setup

Requires a `GROQ_API_KEY` environment variable set in Netlify's dashboard (Site settings → Environment variables).

```bash
netlify dev
```

## Notes

Built mobile-first (Termux/Acode) and deployed on Netlify.
