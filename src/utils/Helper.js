export function truncateFileName(fileName, maxLength) {
  if (fileName?.length <= maxLength) {
    return fileName;
  }

  const extensionIndex = fileName?.lastIndexOf(".");
  const nameWithoutExtension = fileName?.substring(0, extensionIndex);
  const truncatedName = nameWithoutExtension?.substring(0, maxLength - 3);
  const extension = fileName?.substring(extensionIndex);

  return truncatedName + ".." + extension;
}
