const contentEmail = (arrayProducts) => {
  let output = "";

  arrayProducts.forEach((product) => {
    output += `<p>${product.name} x ${product.quantity} $${product.price}</p></br>`;
  });

  return output;
};

module.exports = contentEmail;
