const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  // Create an empty object of type Partial<T> to store the picked properties
  const finalObject: Partial<T> = {};

  // Iterate over each key in the 'keys' array
  for (const key of keys) {
    // Check if the 'obj' is truthy and if it has the property represented by 'key'
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      // If the property exists, assign its value to the corresponding key in 'finalObject'
      finalObject[key] = obj[key];
    }
  }

  // Return the 'finalObject' containing only the picked properties
  return finalObject;
};

// Export the 'pick' function as the default export of this module
export default pick;
