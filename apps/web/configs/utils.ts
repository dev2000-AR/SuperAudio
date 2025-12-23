export function shadeColor(color: string, percent: number): string {
  // Verificar si color es válido antes de continuar
  if (!color || color[0] !== "#" || color.length !== 7) {
    color = "#000000"; // Asignar un color predeterminado si no es válido
  }

  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + Math.round((R * percent) / 100)));
  G = Math.min(255, Math.max(0, G + Math.round((G * percent) / 100)));
  B = Math.min(255, Math.max(0, B + Math.round((B * percent) / 100)));

  return `#${R.toString(16).padStart(2, "0")}${G.toString(16).padStart(2, "0")}${B.toString(16).padStart(2, "0")}`;
}

export const removeDuplicate = (array: any) => {
  let dups: any[] = [];
  var newArray = array.filter(function (el: any) {
    if (dups.indexOf(el.id) == -1) {
      dups.push(el.id);
      return true;
    }

    return false;
  });
  return newArray;
};

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
