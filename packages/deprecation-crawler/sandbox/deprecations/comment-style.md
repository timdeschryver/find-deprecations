<!-- ruid-groups

- master:
  - https://github.com/timdeschryver/find-deprecations/tree/master/deprecation-comments/crawled.ts#L6
  - https://github.com/timdeschryver/find-deprecations/tree/master/deprecation-comments/crawled.ts#L14
  - https://github.com/timdeschryver/find-deprecations/tree/master/deprecation-comments/crawled.ts#L24
  - https://github.com/timdeschryver/find-deprecations/tree/master/deprecation-comments/crawled.ts#L29
  - https://github.com/timdeschryver/find-deprecations/tree/master/deprecation-comments/crawled.ts#L34

ruid-groups -->

# comment-style

Some general information what all there deprecations have in common.

## Things affected by this Change:

- [methodName](url)
- [methodName](url)

## Reason

Short explanation of why the deprecation got introduced

## Implication

This section is an explanation that accompanies the 'before deprecation' and 'after deprecation' snippets.
It explains the different between the two versions to the user in a detailed way to help the user to spot the differences in code.
Make sure to also include estimations on when it breaks.

## Refactoring

Code example showing the situation before the deprecation, and after the deprecation including the versions.

Example:

> introduced in version 6.0.0-alpha4
> breaking in version 8.0.0

the following version specifier are set for the rxjs dependencies in StackBlitz:

**Example Before: <6.0.0-alpha4**

```ts
// code here
```

**Example After: >=6.0.0-alpha4 <8.0.0**

```ts
// code here
```