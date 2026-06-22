```markdown
# discord-enterprise Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the development conventions and workflows used in the `discord-enterprise` JavaScript codebase. You'll learn about file naming, import/export styles, commit patterns, and how to write and run tests. This guide is designed to help contributors maintain consistency and quality across the project.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userManager.js`, `messageHandler.js`

### Import Style
- Both ES6 `import` and CommonJS `require` are used.
  - Example (ES6):
    ```js
    import { fetchData } from './apiUtils';
    ```
  - Example (CommonJS):
    ```js
    const { fetchData } = require('./apiUtils');
    ```

### Export Style
- Use **named exports** for modules.
  - Example:
    ```js
    // In userManager.js
    export function createUser(data) { ... }
    export function deleteUser(id) { ... }
    ```

### Commit Patterns
- Use **Conventional Commits** with the `feat` prefix for new features.
  - Example:
    ```
    feat: add support for custom message reactions
    ```
- Commit messages average around 60 characters.

## Workflows

### Feature Development
**Trigger:** When adding a new feature  
**Command:** `/feature-dev`

1. Create a new branch for your feature.
2. Write code following the coding conventions above.
3. Add or update tests in files matching `*.test.*`.
4. Commit changes using the `feat:` prefix.
5. Open a pull request for review.

### Testing
**Trigger:** When verifying code correctness  
**Command:** `/run-tests`

1. Identify test files (pattern: `*.test.*`).
2. Run the test suite using the project's preferred test runner (framework not explicitly detected; check project scripts or documentation).
3. Review test results and fix any failing tests.

## Testing Patterns

- Test files are named with the pattern `*.test.*` (e.g., `userManager.test.js`).
- The specific testing framework is not detected; check for test scripts in `package.json` or ask maintainers for details.
- Example test file structure:
  ```js
  // userManager.test.js
  import { createUser } from './userManager';

  test('should create a user with valid data', () => {
    const user = createUser({ name: 'Alice' });
    expect(user.name).toBe('Alice');
  });
  ```

## Commands
| Command         | Purpose                                 |
|-----------------|-----------------------------------------|
| /feature-dev    | Start a new feature development workflow |
| /run-tests      | Run the test suite                      |
```
