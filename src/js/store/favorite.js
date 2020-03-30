import locations from "./locations";
import currencyUI from "../views/currency";

class FavoriteUI {
  constructor(currency) {
    this.container = document.querySelector(".dropdown-content");
    this.dropDownItem = document.querySelector(".favorite-item");
    this.deleteBtn = document.querySelector(".delete-favorite");
    this.getCurrencySymbol = currency.getСurrencySymbol.bind(currency);
  }

  serializeFavorite(parent) {
    const ticketsOn = Object.values(locations.lastSeatch).find(ticket => {
      if (ticket.departure_at === parent) {
        return ticket;
      }
    });
    this.renderFavorite(ticketsOn);
  }

  renderFavorite(elem) {
    let fragment = "";
    const currency = this.getCurrencySymbol();
    fragment += FavoriteUI.favoriteTemplate(elem, currency);
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  deleteFavorite() {}

  getFavoriteValue(clickOn) {
    const parent = clickOn.closest(".ticket-card");
    const childOn = parent.querySelector(".ticket-time-departure").textContent;
    this.serializeFavorite(childOn);
  }

  static favoriteTemplate(parent, currency) {
    return `
    <div class="favorite-item  d-flex align-items-start">
    <img
      src="${parent.airline_logo}"
      class="favorite-item-airline-img"
    />
    <div class="favorite-item-info d-flex flex-column">
      <div
        class="favorite-item-destination d-flex align-items-center"
      >
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${parent.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${parent.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${parent.departure_at}</span>
        <span class="ticket-price ml-auto">${currency}${parent.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${parent.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${parent.flight_number}</span>
      </div>
      <button
        class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" type="reset" name = "action"
        >Delete
        </button>
    </div>
  </div>
    `;
  }
}

const favoriteUI = new FavoriteUI(currencyUI);

export default favoriteUI;
