---
trigger: always_on
---

# General rules for writing code in this project

## Use Bazel for building, testing and running

Always use Bazel for building, testing and running the project. Do not use npm or yarn.

## Code Style

### Styling needs to be separated from code

Put all styling into css files, do not use the style attribute in HTML elements.

### Prefer property bags (interfaces) over individual arguments

Instead of taking multiple arguments using plain old datatypes, prefer to create interfaces such that the arguments get proper names on the call sites. This is specifically important for writing readable code in tests.

## Tests

Always write tests for new code. Always run tests using Bazel.