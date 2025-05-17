# Presentation Layer

This directory contains UI components and presentation logic.

## Structure

```
presentation/
├── components/    # Reusable UI components
├── pages/        # Page components
├── hooks/        # Custom React hooks
├── contexts/     # React contexts
└── utils/        # Presentation utilities
```

## Responsibilities

- Implement UI components
- Handle user interactions
- Manage UI state
- Handle routing
- Implement layouts
- Handle UI logic

## Rules

- Can depend on application layer
- No direct domain access
- No direct infrastructure access
- UI components only
- Presentation logic only
- Use application services 