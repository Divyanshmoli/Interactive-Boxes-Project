const items = [
  {
    id: 1,
    units: 1,
    description: "Standard Price",
    offer: 10,
    price: 10,
    originalPrice: 24,
    popular: false,
  },
  {
    id: 2,
    units: 2,
    description: "",
    offer: 20,
    price: 18,
    originalPrice: 24,
    popular: true,
  },
  {
    id: 3,
    units: 3,
    description: "",
    offer: 30,
    price: 24,
    originalPrice: 24,
    popular: false,
  },
];

const state = {
  _selected: null,
  _total: 0,
  get selected() {
    return this._selected;
  },
  set selected(value) {
    this._selected = value;

    const item = items.find((item) => item.id === value);

    document.querySelector("li.item.selected")?.classList?.remove("selected");
    document
      .querySelector(`li.item[data-id="${value}"]`)
      ?.classList?.add("selected");

    this.total = item.price;
  },
  get total() {
    return this._total;
  },
  set total(value) {
    this._total = value;

    const totalEl = document.querySelector("#total");
    if (totalEl) {
      totalEl.innerHTML = value.toFixed(2);
    }
  },
};

window.addEventListener("load", () => {
  const itemsEl = document.querySelector("#items");

  for (const item of items) {
    const itemEl = document.createElement("li");

    itemEl.classList.add("item");

    itemEl.dataset.id = item.id;
    itemEl.innerHTML = /*html*/ `
        <table>
            <tbody>
                <tr>
                    <td><div class="checkmark"></div></td>
                    <td>
                        <div class="title-offer">
                            <b>${item.units} Unit</b>
                            <span>${item.offer}% Off</span>
                        </div>
                        <div class="description">${item.description}</div>
                    </td>
                    <td>
                        <div class="final-price">$${item.price.toFixed(2)} USD</div>
                        <div class="original-price">$${item.originalPrice.toFixed(
                            2
                        )} USD</div>
                    </td>
                </tr>
                <tr class="details">
                    <td></td>
                    <td>
                        <table>
                            <tr>
                                <td></td>
                                <td>Size</td>
                                <td>Color</td>
                            </tr>
                            ${new Array(item.units)
                              .fill("")
                              .map(
                                (_, index) => /*html*/ `
                                <tr>
                                    <td>#${index + 1}</td>
                                    <td>
                                        <select>
                                            <option value="1">S</option>
                                            <option value="2">M</option>
                                            <option value="3">L</option>
                                            <option value="4">XL</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select value="" placeholder="Color">
                                            <option value="">Color</option>
                                            <option value="1">Red</option>
                                            <option value="2">Green</option>
                                            <option value="3">Blue</option>
                                        </select>
                                    </td>
                                </tr>
                                `
                              )
                              .join("\n")}
                        </table>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
      `;

    if (item.popular) {
      itemEl.innerHTML += /*html*/ `
            <div class="popular-badge"></div>
        `;
    }

    itemEl.addEventListener("click", () => {
      state.selected = item.id;
    });

    itemsEl.appendChild(itemEl);
  }

  state.selected = items[1].id;
});
