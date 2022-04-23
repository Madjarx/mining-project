export function shouldBeStringOrThrow(string) {
  if (!string) throw "must be string";
  return string;
}
