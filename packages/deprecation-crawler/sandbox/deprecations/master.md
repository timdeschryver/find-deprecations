# master

## all-lowercase

### crawled.ts

#### lowercase1 (VariableStatement) {#3998890672}

@deprecated internal use only
Example: all lowercase character
Group name: all lowercase
Regex: iNternal use onLy

```ts
const lowercase1 = 0;
```

#### lowercase2 (VariableStatement) {#2129363187}

@deprecated Internal use only
Example: One uppercase character

```ts
const lowercase2 = 0;
```

#### lowercase3 (VariableStatement) {#2585813938}

@deprecated inteRnal use oNly
Example: Multiple uppercase character

```ts
const lowercase3 = 0;
```

## comment-style

### crawled.ts

#### foo (FunctionDeclaration) {#3397214801}

@deprecated comment-style single line deprecation

```ts
function foo() {
  return 'foo';
}
```

#### foo2 (FunctionDeclaration) {#456802929}

@nocollapse
@deprecated comment-style deprecation with leading text

```ts
function foo2() {
  return 'foo2';
}
```

#### foo3 (FunctionDeclaration) {#242198417}

This is foo3
@method foo3
@deprecated comment-style deprecation with leading and trailing text
@return {void}

```ts
function foo3() {
  return 'foo3';
}
```

#### foo4 (FunctionDeclaration) {#2601492017}

@deprecated comment-style single line deprecation with no space at the end

```ts
function foo4() {
  return 'foo4';
}
```

#### foo5 (FunctionDeclaration) {#2711487569}

// @deprecated comment-style a non-jsdoc comment

```ts
function foo5() {
  return 'foo5';
}
```

## multiple-string-patterns-at-once

### crawled.ts

#### multiPatternMatch1 (VariableStatement) {#1734398741}

@deprecated This const named `t` is deprecated. See {@link info} for xyz.
Example: 3 pattern match
Group name: multi pattern match

```ts
const multiPatternMatch1 = 0;
```

#### multiPatternMatch2 (VariableStatement) {#3477709142}

@deprecated This is deprecated IMPORTANT!. See {@link info} for xyz.
Example: 3 pattern match with other start

```ts
const multiPatternMatch2 = 0;
```

#### multiPatternMatch3 (VariableStatement) {#2417065367}

@deprecated `t2` is deprecated. See {@link info} for xyz and related things.
Example: 3 pattern match with other end

```ts
const multiPatternMatch3 = 0;
```

## whitespace-normalisation

### crawled.ts

#### whitespacesNormalisation1 (VariableStatement) {#3186155811}

@deprecated This const is deprecated
Example: single whitespaces
Group name: whitespace normalisation
Regex: This const is deprecated

```ts
const whitespacesNormalisation1 = 0;
```

#### whitespacesNormalisation2 (VariableStatement) {#677771456}

@deprecated This const is deprecated
Example: start multiple whitespaces and also multiple times inside

```ts
const whitespacesNormalisation2 = 0;
```

#### whitespacesNormalisation3 (VariableStatement) {#3130163297}

@deprecated This const is deprecated
Example: multiple whitespaces multiple times

```ts
const whitespacesNormalisation3 = 0;
```