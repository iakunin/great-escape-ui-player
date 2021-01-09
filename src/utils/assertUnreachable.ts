export default function assertUnreachable(_x: never): never {
  throw new Error('Not expected to get here');
}
