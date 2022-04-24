export function shouldBeStringOrThrow(string) {
  if (!string) throw `shouldBeStringOrThrow -> must be string -> was: ${string}`;
  return string;
}
