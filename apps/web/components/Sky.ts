export const drawBlueSky = (ctx: CanvasRenderingContext2D, height: number) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#125588");
  gradient.addColorStop(0.4, "#1c6b9f");
  gradient.addColorStop(0.7, "#75a7c5");
  gradient.addColorStop(0.9, "#d6e6ef");
  gradient.addColorStop(1, "#ffffff");
  return gradient;
};
