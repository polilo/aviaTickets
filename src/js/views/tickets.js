import currencyUI from "./currency";
import favoriteUI from "../store/favorite";

class TicketUI {
  constructor(currency, favorite) {
    this.container = document.querySelector(".tickets-sections .row");
    this.favorite = favorite;
    this.getCurrencySymbol = currency.getСurrencySymbol.bind(currency);
    const favoriteContainer = document.querySelector(
      ".tickets-sections .container"
    );
    favoriteContainer.addEventListener("click", e => {
      e.preventDefault();
      this.favorite.getFavoriteValue(e.target);
    });
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    const currency = this.getCurrencySymbol();

    tickets.forEach(ticket => {
      const template = TicketUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
    По вашему запросу ничего не найдено.
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
    <div class="card ticket-card">
      <div class="ticket-airline d-flex align-items-center">
        <img
          src="${ticket.airline_logo}"
          class="ticket-airline-img"
        />
        <span class="ticket-airline-name"
          >${ticket.airline_name}</span
        >
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${ticket.origin_name} </span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        <a
        class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto" 
      >Add to favorites</a
      >
      </div>
    </div>
  </div>
  `;
  }
}

const ticketsUI = new TicketUI(currencyUI, favoriteUI);

export default ticketsUI;
