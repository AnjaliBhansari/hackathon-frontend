# Application Layer

This directory contains application-specific business logic and use cases.

## Structure

```
application/
├── services/      # Application services
├── use-cases/     # Use case implementations
└── dtos/         # Data Transfer Objects
```

## Responsibilities

- Implement business logic
- Handle use cases
- Coordinate between layers
- Transform data between layers
- Manage application state

## Rules

- Can depend on domain layer
- Can depend on infrastructure layer
- No UI components
- No direct external service calls
- Business logic only
- Use domain models 