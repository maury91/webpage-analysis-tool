declare module 'flat-colors' {
  function getFlatColor(): [number, number, number];
  namespace getFlatColor {
    function toRgb(hex: string): [number, number, number] | null;
  }
  export = getFlatColor;
}
