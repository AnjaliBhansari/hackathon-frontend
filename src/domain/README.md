# Domain Layer

This directory contains the core business logic and domain models.

## Structure

```
domain/
├── entities/      # Domain entities
├── repositories/  # Repository interfaces
├── services/      # Domain service interfaces
└── value-objects/ # Value objects
```

## Responsibilities

- Define domain entities
- Define business rules
- Define repository interfaces
- Define service interfaces
- Define value objects

## Rules

- No dependencies on other layers
- Pure business logic
- No UI components
- No external dependencies
- No framework dependencies
- Define interfaces for external dependencies 