"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    // Create an empty object of type Partial<T> to store the picked properties
    const finalObject = {};
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
exports.default = pick;
