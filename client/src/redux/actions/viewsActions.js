export const toggle = name => {
  return {
    type: `${name.toUpperCase()}_TOGGLE`
  };
};
