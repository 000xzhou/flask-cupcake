export function isValidUrl(url) {
  // Regular expression for a valid URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  // Test if the provided string matches the URL pattern
  return urlRegex.test(url);
}
