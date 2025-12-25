(async function () {
  let products;
  try {
    const res = await fetch("https://inventory.betz-engineering.ch/products");
    products = await res.json();
    // products = [{"name":"ui_board_1u","stock":1},{"name":"obsidian_a35","stock":199}];
  } catch (e) {
    console.error("Inventory fetch failed", e);
    return;
  }

  const stock = Object.fromEntries(
    products.map(p => [p.name, p.stock])
  );

  document.querySelectorAll(".shop-ui").forEach(el => {
    const id = el.dataset.product;
    if (!(id in stock))
      return;

    const qty = stock[id];

    if (qty > 0) {
      // create a buy now link
      const link = document.createElement("a");
      link.href = `https://inventory.betz-engineering.ch/checkout/${id}`;
      link.target = "_blank";
      link.textContent = `🛒 ${qty} in stock`;
      el.appendChild(link);
    } else {
      el.textContent = "No stock";
      el.style.color = "grey";
    }
  });
})();
