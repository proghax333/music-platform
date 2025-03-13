export function deriveSetState(setState, propertyPath) {
  return (valueOrUpdater) => {
    setState((prevState) => {
      if (propertyPath.length === 0) {
        return typeof valueOrUpdater === "function"
          ? valueOrUpdater(prevState)
          : valueOrUpdater;
      }

      // Create a shallow copy of the top-level state
      let newState = Array.isArray(prevState)
        ? [...prevState]
        : { ...prevState };
      let current = newState;

      for (let i = 0; i < propertyPath.length - 1; i++) {
        const key = propertyPath[i];

        if (Array.isArray(current[key])) {
          current[key] = [...current[key]]; // Clone arrays correctly
        } else if (typeof current[key] === "object" && current[key] !== null) {
          current[key] = { ...current[key] }; // Clone objects
        } else {
          current[key] = {}; // Ensure path exists
        }

        current = current[key];
      }

      const lastKey = propertyPath[propertyPath.length - 1];

      // Apply the new value or function update
      current[lastKey] =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(current[lastKey])
          : valueOrUpdater;

      return newState;
    });
  };
}
