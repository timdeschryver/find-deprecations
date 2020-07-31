/**
 * Examples in this file should demonstrate the multi-pattern matching.
 * The regex can contain one to many groups and has to match all of them.
 * Example:
 * - /^(?=.*This const named!)(?=.*deprecated!)(?=.*xyz!).../
 *
 */

/**
 * @deprecated This const named `t` is deprecated. See {@link info} for xyz.
 * Example: 3 pattern match
 * Group name: multi pattern match
 * Regex: /^(?=.*This const named!)(?=.*deprecated!)(?=.*xyz!).../
 */
const multiPatternMatch1 = 0;

/**
 * @deprecated IMPORTANT! This const named `t1` is deprecated. See {@link info} for xyz.
 * Example: 3 pattern match with other start
 */
const multiPatternMatch2 = 0;

/**
 * @deprecated This const named `t2` is deprecated. See {@link info} for xyz and related things.
 * Example: 3 pattern match with other end
 */
const multiPatternMatch3 = 0;
