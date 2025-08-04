export class GlobalUtil {

    // Capitalize the first letter of a string
  static capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    const lower = str.toLocaleLowerCase("es-ES");
    return lower[0].toLocaleUpperCase("es-ES") + lower.slice(1);
  };

  // Remove nulls and undefined from an object
  static removeNullsAndUndefined<T extends Record<string, any>>(
    obj: T
  ): Partial<T> {
    const entries = Object.entries(obj).filter(
      ([_, value]) => value != null && value != undefined
    );
    return Object.fromEntries(entries) as Partial<T>;
  }
}