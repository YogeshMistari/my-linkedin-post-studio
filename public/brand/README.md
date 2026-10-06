# Brand Assets

Put creator brand assets in this folder so they are versioned with the GitHub repository and served by Next.js from the `/brand/` URL.

## Default file

Upload your main logo as:

```text
public/brand/data-with-anurag-logo.png
```

Post Studio uses this same file for:

- the logo shown in the app header
- the browser favicon
- shortcut/bookmark icon
- Apple touch icon

## Recommended logo format

For the cleanest result:

- PNG
- square canvas preferred
- transparent background preferred
- 512 x 512 px recommended
- keep the important logo artwork away from the extreme edges

If your normal brand logo is very wide, export a square icon/mark version instead and change `faviconPath` separately in:

```text
config/creator.config.ts
```

Example:

```ts
logoPath: "/brand/my-brand-logo.png",
faviconPath: "/brand/my-brand-icon.png",
```

Both files can live in this same folder.
