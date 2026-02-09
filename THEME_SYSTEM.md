# Theme System Documentation

## Overview
Our application implements a comprehensive dark/light mode toggle system using `next-themes` and Tailwind CSS. The theme system follows ShadCN UI patterns and ensures consistent styling across all components.

## Components

### Theme Provider
Located in `app/layout.tsx`, the `ThemeProvider` wraps the entire application:

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
```

### Theme Toggle Component
The `ThemeToggle` component in `components/shared/ThemeToggle.tsx` provides a button to switch between themes:

- Uses `useTheme` hook to detect and update theme state
- Implements hydration protection to prevent SSR mismatches
- Follows accessibility standards with proper ARIA labels
- Uses Lucide React icons for visual indication of current theme
- Includes smooth transitions between themes
- Styled with ShadCN UI design principles

### Supported Themes
- `light`: Default light theme
- `dark`: Dark theme with appropriate contrast ratios

## Implementation Details

### CSS Variables-Based Theming
The system uses CSS variables defined in `app/globals.css` for consistent theming. Components use Tailwind's `dark:` prefix to apply styles when in dark mode:

```tsx
<div className="bg-background text-foreground">
```

### Component Consistency
All UI components properly implement dark mode:
- Buttons: Use conditional classes for background/text colors
- Inputs: Support dark backgrounds and text
- Modals: Apply dark mode to backgrounds and text
- Cards: Adapt borders and backgrounds to theme
- Navigation: Maintain readability in both themes

### Accessibility
- Maintains WCAG-compliant contrast ratios in both themes
- Proper semantic HTML structure
- Focus states preserved in both themes
- Screen reader friendly with appropriate ARIA attributes
- Hydration handling to prevent layout shifts

## Usage
To add dark mode support to a component:
1. Use CSS variable-based Tailwind classes (`bg-background`, `text-foreground`, etc.)
2. Ensure sufficient contrast in both themes
3. Test readability and usability in both modes

Example:
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Themed Button
</button>
```

## Global Styles
Global dark mode styles are defined in `app/globals.css` using CSS variables that are automatically applied based on the theme.

## Advanced Configuration
For detailed implementation instructions, see `THEME_IMPLEMENTATION.md`.