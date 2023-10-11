export const getMoneyPattern = (val) => {
  if (val) {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
};
