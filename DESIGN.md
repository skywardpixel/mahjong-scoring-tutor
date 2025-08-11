# Mahjong Scoring Tutor - Design System

## Overview
This document defines the comprehensive design system for the Mahjong Scoring Tutor app, ensuring visual consistency and professional UX across all components.

## Design Principles

### 1. Consistency First
- Every similar element should look and behave identically
- Reuse patterns, never create one-off solutions
- Maintain predictable user interactions

### 2. Modern Minimalism
- Clean, uncluttered interfaces
- Generous whitespace for readability
- Focus user attention on learning content

### 3. Mahjong-Inspired Aesthetics
- Subtle references to traditional mahjong colors
- Professional appearance suitable for educational use
- Avoid overwhelming decorative elements

## Color Palette

### Primary Colors
```css
--mahjong-red: #d63031        /* Traditional red dragon */
--mahjong-green: #00b894      /* Traditional green dragon */
--mahjong-blue: #0984e3       /* Traditional blue suit */
--mahjong-ivory: #fdcb6e      /* Traditional tile color */
```

### Neutral Colors
```css
--primary: #2d3436            /* Main text, borders */
--primary-soft: #636e72       /* Secondary text */
--primary-lighter: #b2bec3    /* Tertiary text */
--primary-ghost: rgba(45, 52, 54, 0.05) /* Subtle backgrounds */

--background: #fefefe         /* Page background */
--background-alt: #f8f9fa     /* Alternative backgrounds */
--surface: #ffffff            /* Card backgrounds */
--text-primary: #2d3436       /* Primary text */
--text-secondary: #636e72     /* Secondary text */
--text-tertiary: #a0a6ab      /* Muted text */
--text-inverse: #ffffff       /* White text */
```

### Semantic Colors
```css
--success: var(--mahjong-green)
--success-soft: #55efc4
--error: var(--mahjong-red)  
--error-soft: #fab1a0
--warning: #fdcb6e
--info: var(--mahjong-blue)
```

### Borders
```css
--border-light: rgba(45, 52, 54, 0.08)   /* Subtle dividers */
--border-medium: rgba(45, 52, 54, 0.12)  /* Standard borders */
--border-strong: rgba(45, 52, 54, 0.24)  /* Emphasis borders */
```

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

### Type Scale (Perfect 4th - 1.333 ratio)
```css
--font-size-xs: 0.75rem     /* 12px - Fine print */
--font-size-sm: 0.875rem    /* 14px - Small text */
--font-size-base: 1rem      /* 16px - Body text */
--font-size-lg: 1.125rem    /* 18px - Large body */
--font-size-xl: 1.333rem    /* ~21px - Small headings */
--font-size-2xl: 1.777rem   /* ~28px - Medium headings */
--font-size-3xl: 2.369rem   /* ~38px - Large headings */
--font-size-4xl: 3.157rem   /* ~51px - Display text */
```

### Font Weights
```css
--font-weight-normal: 400    /* Body text */
--font-weight-medium: 500    /* Emphasis */
--font-weight-semibold: 600  /* Subheadings */
--font-weight-bold: 700      /* Headings */
--font-weight-black: 800     /* Display */
```

### Typography Rules
1. **Headings**: Use semibold (600) or bold (700), never black (800) except for main title
2. **Body text**: Always use normal (400) weight
3. **Emphasis**: Use medium (500) for subtle emphasis, semibold (600) for strong emphasis
4. **Line height**: 1.6 for body text, 1.3 for headings
5. **Letter spacing**: -0.02em for large headings, 0 for body text

## Spacing System

### 8px Base Grid
```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
```

### Spacing Rules
1. **Never use arbitrary values** - Always use the spacing scale
2. **Component spacing**: Use --space-4 to --space-8 for internal padding
3. **Section spacing**: Use --space-8 to --space-12 for section gaps
4. **Page margins**: Use --space-4 minimum, --space-6 preferred

## Border Radius

### Radius Scale
```css
--radius-xs: 6px     /* Small elements */
--radius-sm: 8px     /* Buttons, inputs */
--radius-md: 12px    /* Cards, containers */
--radius-lg: 16px    /* Large containers */
--radius-xl: 24px    /* Page sections */
--radius-full: 999px /* Pills, badges */
```

### Radius Rules
1. **Buttons**: Use --radius-sm for small, --radius-md for standard
2. **Cards**: Use --radius-lg for lesson containers, --radius-xl for major sections
3. **Interactive elements**: Consistent radius creates visual grouping
4. **Never mix radius sizes** within the same component type

## Shadows

### Shadow Scale
```css
--shadow-xs: 0 1px 2px rgba(45, 52, 54, 0.04)
--shadow-sm: 0 2px 4px rgba(45, 52, 54, 0.06)
--shadow-md: 0 4px 8px rgba(45, 52, 54, 0.08), 0 2px 4px rgba(45, 52, 54, 0.03)
--shadow-lg: 0 8px 16px rgba(45, 52, 54, 0.10), 0 4px 8px rgba(45, 52, 54, 0.04)
--shadow-xl: 0 16px 32px rgba(45, 52, 54, 0.12), 0 8px 16px rgba(45, 52, 54, 0.05)
--shadow-glow: 0 0 0 1px rgba(45, 52, 54, 0.04), 0 2px 8px rgba(45, 52, 54, 0.08)
--shadow-focus: 0 0 0 3px rgba(13, 148, 136, 0.15), 0 2px 8px rgba(45, 52, 54, 0.08)
```

### Shadow Rules
1. **Cards**: Use --shadow-sm for subtle elevation, --shadow-md for standard cards
2. **Interactive hover**: Increase shadow by one level (sm→md, md→lg)
3. **Focus states**: Always use --shadow-focus for accessibility
4. **Avoid heavy shadows** - Keep the design light and airy

## Animation System

### Timing Functions
```css
--ease-out: cubic-bezier(0, 0, 0.2, 1)      /* Default transitions */
--ease-in: cubic-bezier(0.4, 0, 1, 1)       /* Exit transitions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) /* Complex animations */
--ease-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55) /* Playful effects */
```

### Durations
```css
--duration-fast: 150ms    /* Quick feedback */
--duration-normal: 250ms  /* Standard transitions */
--duration-slow: 350ms    /* Complex animations */
```

### Animation Rules
1. **Hover effects**: Use --duration-fast for immediate feedback
2. **State changes**: Use --duration-normal for most transitions
3. **Page transitions**: Use --duration-slow for major changes
4. **Always use ease-out** for natural feeling animations
5. **Reduce motion** for accessibility when preferred

## Component Standards

### Buttons

#### Primary Button
```css
.button {
  background: var(--primary);
  color: var(--text-inverse);
  border: none;
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-glow);
  transition: all var(--duration-normal) var(--ease-out);
}
```

#### Secondary Button
```css
.button.secondary {
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border-medium);
  box-shadow: var(--shadow-sm);
}
```

### Cards

#### Lesson Container
```css
.lesson-container {
  background: var(--surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  padding: var(--space-12);
}
```

#### Content Card
```css
.content-card {
  background: var(--background-alt);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
}
```

### Interactive Elements

#### Quiz Options
```css
.quiz-option {
  background: var(--surface);
  border: 1px solid var(--border-medium);
  padding: var(--space-5) var(--space-8);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-normal) var(--ease-out);
}

.quiz-option:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.quiz-option.selected {
  border-color: var(--primary);
  background: var(--primary-ghost);
  box-shadow: var(--shadow-md);
}

.quiz-option.correct {
  border-color: var(--success);
  background: linear-gradient(135deg, var(--success-soft) 8%, var(--surface) 100%);
}

.quiz-option.incorrect {
  border-color: var(--error);
  background: linear-gradient(135deg, var(--error-soft) 8%, var(--surface) 100%);
}
```

### Form Elements

#### Input Fields
```css
.input-field {
  padding: var(--space-4);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  background: var(--surface);
  color: var(--text-primary);
  transition: all var(--duration-normal) var(--ease-out);
}

.input-field:focus {
  outline: none;
  border-color: var(--mahjong-blue);
  box-shadow: var(--shadow-focus);
}
```

## Layout Standards

### Container Widths
```css
.app {
  max-width: 1000px;        /* Main app container */
  margin: 0 auto;
  padding: var(--space-4);
}

.lesson-container {
  max-width: 800px;         /* Lesson content */
}

.practice-mode {
  max-width: 900px;         /* Practice interface */
}
```

### Grid Systems
```css
/* Standard two-column layout */
.two-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

/* Three-column layout */
.three-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}
```

## State Indicators

### Success State
```css
.state-success {
  background: linear-gradient(135deg, var(--success-soft) 8%, var(--surface) 100%);
  border: 1px solid var(--success);
  color: var(--text-primary);
}
```

### Error State
```css
.state-error {
  background: linear-gradient(135deg, var(--error-soft) 8%, var(--surface) 100%);
  border: 1px solid var(--error);
  color: var(--text-primary);
}
```

### Warning State
```css
.state-warning {
  background: linear-gradient(135deg, var(--warning) 8%, var(--surface) 100%);
  border: 1px solid var(--warning);
  color: var(--text-primary);
}
```

## Mobile Responsive Rules

### Breakpoints
```css
/* Tablet and below */
@media (max-width: 768px) {
  /* Reduce spacing by one level */
  /* Stack columns vertically */
  /* Increase touch targets to 44px minimum */
}

/* Mobile */
@media (max-width: 480px) {
  /* Further reduce spacing */
  /* Full-width buttons */
  /* Single column layouts */
}
```

### Touch Targets
- Minimum 44px height for all interactive elements
- Minimum 44px width for buttons
- Add visual space between touch elements

## Accessibility Standards

### Color Contrast
- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text
- All interactive states must meet contrast requirements

### Focus Management
- All interactive elements must have visible focus states
- Use --shadow-focus for consistent focus indication
- Logical tab order throughout the interface

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Rules

### CSS Organization
1. **Use CSS custom properties** for all values
2. **Group related properties** (colors, spacing, typography)
3. **Comment complex calculations** and decisions
4. **Maintain consistent naming** conventions

### Component Structure
1. **Base styles first**, then modifiers
2. **Hover states** immediately after base styles
3. **State classes** (.selected, .correct, .error) grouped together
4. **Responsive overrides** at the end

### Naming Conventions
- **BEM methodology**: `.block__element--modifier`
- **State classes**: `.is-active`, `.has-error`
- **Utility classes**: `.text-center`, `.mb-4`
- **Component classes**: `.lesson-container`, `.quiz-option`

## Quality Checklist

Before releasing any component:
- [ ] Uses only design system values (no arbitrary numbers)
- [ ] Consistent with similar components
- [ ] Accessible focus states
- [ ] Responsive on all screen sizes
- [ ] Meets color contrast requirements
- [ ] Smooth animations and transitions
- [ ] Proper semantic HTML structure
- [ ] Touch-friendly on mobile devices