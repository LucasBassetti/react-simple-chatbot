<!--
The PR title must follow Conventional Commits (https://www.conventionalcommits.org):

  <type>(<optional scope>)<optional !>: <short summary in the imperative mood>

Types:
  feat      a new feature
  fix       a bug fix
  docs      documentation only
  style     formatting, no code change
  refactor  a code change that neither fixes a bug nor adds a feature
  perf      a performance improvement
  test      adding or fixing tests
  build     build system or dependencies
  ci        CI configuration
  chore     other changes that don't modify src or tests
  revert    reverts a previous commit

Add ! after the type (or scope) for a breaking change, e.g. `feat!: drop React 17 support`.

Examples:
  feat: add a typing indicator to custom steps
  fix(cache): restore options without value
  docs: document the extraControl prop
-->

## Description

<!-- What does this PR change, and why? -->

## Related issue

<!-- e.g. Closes #123. Please open an issue first for big changes. -->

## Type of change

- [ ] `feat`: new feature
- [ ] `fix`: bug fix
- [ ] `docs`: documentation
- [ ] `refactor` / `perf` / `test`
- [ ] `build` / `ci` / `chore`
- [ ] Breaking change (the title has `!`, and the migration is described below)

## How has this been tested?

<!-- Tests added or updated, and manual testing (browsers, React versions, example app...). -->

## Breaking changes

<!-- Only for breaking changes: what breaks, and how to migrate. Remove this section otherwise. -->

## Checklist

- [ ] The title follows Conventional Commits
- [ ] `npm run lint`, `npm run typecheck` and `npm test` pass
- [ ] Tests cover the change
- [ ] The README is updated when the public API changes
