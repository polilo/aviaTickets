import {
  getAutoCompleteInstance,
  getDatePickerInstance
} from "../plugins/materialize";

class FormUI {
  constructor(autoCompleteInstance, datePickerInstance) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.depart = document.getElementById("datepicker-depart");
    this.return = document.getElementById("datepicker-return");
    this.originAutoComplete = autoCompleteInstance(this.origin);
    this.destinationAutoComplete = autoCompleteInstance(this.destination);
    this.departDatePicker = datePickerInstance(this.depart);
    this.returnDatePicker = datePickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatePicker.toString();
  }

  get returnDateValue() {
    return this.returnDatePicker.toString();
  }

  setAutoCompleteData(data) {
    this.originAutoComplete.updateData(data);
    this.destinationAutoComplete.updateData(data);
  }

}

const formUI = new FormUI(getAutoCompleteInstance, getDatePickerInstance);

export default formUI;
