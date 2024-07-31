export const createGradient = (
  ctx: CanvasRenderingContext2D,
  color1: string,
  color2: string,
  color3?: string
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)
  if (color3) gradient.addColorStop(1, color3)
  return gradient
}
