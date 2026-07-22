export function getImageUrl(filePath) {
  if (!filePath) {
    return null;
  }

  // Already a complete URL
  if (filePath.startsWith("http://") || filePath.startsWith("https://")
  ) {
    return filePath;
  }

  // If your backend provides a base URL
  const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || "";

  if (!baseUrl) {
    return filePath;
  }

  return `${baseUrl.replace(/\/$/, "")}/${filePath.replace(/^\//, "")}`;
}
