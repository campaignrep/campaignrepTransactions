$(document).ready(function(){
  $('.amountButton').click(function(){
    $('#customAmount').val($(this).data('value'))
  })

  //Stripe Related Code
  let stripe = Stripe('pk_test_PWq57B1bp5fKRpPCflyvASE2')
  let elements = stripe.elements()
  let cardElement = elements.create('card',{
    hidePostalCode: true
  });
  cardElement.mount('#card-element')
  cardElement.on('change', function(event) {
    if (event.complete) {
      $('#donateButton').prop('disabled',false)
    } else if (event.error) {
      console.log('failed')
    }
  });
})

// Address Auto-Complete

let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete() {
  address1Field = document.querySelector("#auto-fill");
  address2Field = document.querySelector("#streetAddress");
  postalField = document.querySelector("#zipCode");
  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us", "ca", "in"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";
  for (const component of place.address_components) {
    const componentType = component.types[0];
    console.log('#######')
    console.log(componentType)
    console.log(component.long_name)
    console.log('#######')
    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        document.querySelector("#zipCode").value = postcode
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "locality":
        document.querySelector("#streetAddress").value = component.long_name;
        break;

      case "administrative_area_level_1": {
        document.querySelector("#state").value = component.short_name;
        break;
      }
      case "administrative_area_level_2": {
        document.querySelector("#city").value = component.short_name;
        break;
      }
    }
  }
  address1Field.value = address1;
  postalField.value = postcode;
  address2Field.focus();
}