# Dark/Light Mode Implementation Guide

This document provides a comprehensive guide to the dark/light mode toggle system implemented in the application using ShadCN UI style and Tailwind CSS.

## Overview

The theme system uses:
- `next-themes` for theme management
- Tailwind CSS with CSS variables for styling
- ShadCN UI design patterns for consistency
- Proper hydration handling to prevent SSR mismatches

## Components

### ThemeProvider

The `ThemeProvider` wraps the entire application and manages the global theme state. It's located in `app/layout.tsx`.

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
  {/* Application content */}
</ThemeProvider>
```

### ThemeToggle

The `ThemeToggle` component provides a button to switch between themes. It's located in `components/shared/ThemeToggle.tsx`.

Features:
- Hydration protection to prevent SSR mismatches
- Smooth transitions between themes
- Accessible ARIA labels
- ShadCN UI styling
- Lucide React icons for visual indication

## Implementation Details

### CSS Variables

The theme system uses CSS variables defined in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  /* ... other variables */
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  /* ... other variables */
}
```

### Tailwind Configuration

The Tailwind configuration in `tailwind.config.ts` extends the default theme with the CSS variables:

```ts
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  // ...
}
```

### Component Styling

Components use Tailwind's `dark:` prefix to apply different styles based on the current theme:

```tsx
<div className="bg-background text-foreground">
  {/* Content that adapts to theme */}
</div>
```

## Usage Instructions

### Adding Theme Support to Components

To add theme support to a component:

1. Use the CSS variable-based color classes:
   ```tsx
   <div className="bg-background text-foreground">
   ```

2. For borders and other elements:
   ```tsx
   <div className="border-border">
   ```

3. For specific color variants:
   ```tsx
   <button className="bg-primary text-primary-foreground hover:bg-primary/90">
   ```

### Using the ThemeToggle Component

Import and use the ThemeToggle component anywhere in your application:

```tsx
import ThemeToggle from '@/components/shared/ThemeToggle';

// Use in your JSX
<header>
  <nav>
    {/* Other navigation items */}
    <ThemeToggle />
  </nav>
</header>
```

### Customizing Theme Colors

To customize theme colors, modify the CSS variables in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%; /* Light theme background */
  --foreground: 222.2 47.4% 11.2%; /* Light theme text */
}

.dark {
  --background: 224 71% 4%; /* Dark theme background */
  --foreground: 213 31% 91%; /* Dark theme text */
}
```

## Accessibility Features

The theme system includes:

- Proper contrast ratios in both light and dark modes
- Semantic HTML structure
- ARIA labels for theme toggle button
- Focus states preserved in both themes
- Screen reader friendly with appropriate ARIA attributes
- Hydration handling to prevent layout shifts

## Best Practices

1. Always use CSS variable-based colors (`bg-background`, `text-foreground`, etc.) instead of hardcoded colors
2. Test components in both light and dark modes for readability
3. Maintain consistent spacing and sizing across themes
4. Use the `dark:` prefix for theme-specific styling
5. Ensure sufficient contrast ratios (minimum 4.5:1 for normal text)
6. Test keyboard navigation in both themes

## Troubleshooting

### Hydration Errors

If you encounter hydration errors, ensure that components using theme-dependent values are properly handled during SSR by using the hydration protection pattern shown in the ThemeToggle component.

### Color Contrast Issues

If text is not readable in a particular theme, adjust the CSS variables in `globals.css` to ensure proper contrast ratios.

### Missing Theme Transitions

Ensure that Tailwind is properly configured with the `darkMode: ['class', '.dark']` setting and that the `dark` class is applied to the `<html>` element.