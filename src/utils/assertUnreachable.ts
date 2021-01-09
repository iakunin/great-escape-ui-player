// Source: https://medium.com/javascript-in-plain-english/684bf5d0e1d1
export default function assertUnreachable(_x: never): never {
  throw new Error('Not expected to get here');
}
