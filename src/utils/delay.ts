export async function delay(duration: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, duration));
}
