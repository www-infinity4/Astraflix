# Astraflix

Synchronized Movie & Music

Metropolis (1927) paired with Pink Floyd’s The Dark Side of the Moon.

This is the self-contained GitHub Pages edition of the existing Astraflix app. It preserves the cinema layout and wired media sources. No AI subscription, API key, server, user upload, or custom GitHub Actions workflow is needed to run it.

## Turn on GitHub Pages

In this repository, open **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Wait for GitHub to finish publishing, then use the URL shown in Settings. These files are ready for Pages; committing them does not itself confirm Pages is enabled.

[GitHub’s publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Files

- `index.html`: website entry point with relative asset paths.
- `app.js` and `styles.css`: prebuilt browser application; committed so Pages needs no application build.
- `app/page.tsx` and `app/globals.css`: editable app and design source.
- `components/ui/button.tsx`, `lib/utils.ts`, `vendor/`: supporting source and vendor license.
- `entry.tsx`, `build.mjs`, `package.json`: portable build setup, independent of the original host.
- `.nojekyll`: serves the committed static files without Jekyll processing.

## Playback

Start film + score begins both; Restart both begins again; Stop pauses the film and reloads the album player (it does not preserve the music position). Movie audio is muted by default. The YouTube album playlist is configured to repeat. Browsers may require an extra tap inside YouTube to allow sound. Ads, buffering, regional restrictions, or removed sources can affect playback. This is an experimental pairing, not sample-accurate or frame-locked synchronization.

## Sources

- [Metropolis on Internet Archive](https://archive.org/details/MetropolisGriggsMoviedrome)
- [The Dark Side of the Moon album playlist](https://www.youtube.com/playlist?list=OLAK5uy_lrCrcAdxFG4aMzMrebs7o9TU384xyF240)

Media streams from the providers; no movie or music files are stored here. Source availability is not guaranteed. Music stays in YouTube’s visible player with its attribution and advertising. This app does not bypass access restrictions or establish redistribution rights.

## Editing later

For developers only: install Node.js and run `npm install`, then `npm run build`. Commit updated source **and** regenerated `app.js` / `styles.css`. Normal visitors and Pages hosting need none of these tools. Keep keys and personal data out of this public repository.

The original hosted app is unchanged by this export. No wallet, payouts, live AI curator, or sign-in service is included.
