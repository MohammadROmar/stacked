export function getImageName(name: string) {
  const imageName = name === '.' ? 'empty' : name === '#' ? 'obstacle' : name;

  return imageName;
}
