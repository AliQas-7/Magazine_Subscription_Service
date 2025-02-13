const calculatePrice = (basePrice, discount) => {
    return basePrice * (1 - discount);
  };
  
  module.exports = { calculatePrice };
  