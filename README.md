# shadcn/ui monorepo template

Fullstack monorepo template with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from '@workspace/ui/components/ui/button';
```

## Commit Message Setting

```
git config --global commit.template .gitmessage.txt
```
