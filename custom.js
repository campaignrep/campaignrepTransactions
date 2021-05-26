$(window).on('load', function() {
 // var btnFinish = $('<button id="btn-Stripe" disabled></button>').text('Donate').addClass('btn-Stripe');
  // SmartWizard initialize
  $('#smartwizard').smartWizard({
     theme:'arrows',
     anchorSettings: {
      anchorClickable: false, // Enable/Disable anchor navigation
      enableAllAnchors: false, // Activates all anchors clickable all times
      markDoneStep: true, // Add done state on navigation
      markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
      removeDoneStepOnNavigateBack: true, // While navigate back done step after active step will be cleared
      enableAnchorOnDoneStep: true, // Enable/Disable the done steps navigation
      enableFinishButton:true
  },
  toolbarSettings:{

    toolbarExtraButtons: [$('<button id="btn-Stripe"></button>').text('Donate').addClass('btn-Stripe')]
  },
  // onLeaveStep:
  });

 $("#smartwizard").on("leaveStep", function(e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {

        var step = currentStepIndex;
        return validateSteps(currentStepIndex)
});

        function validateAllSteps(){
       var isStepValid = true;
       
       if(validateStep1() == false){
         isStepValid = false;
         $('#smartwizard').smartWizard('setError',{stepnum:0,iserror:true});         
       }else{
         $('#smartwizard').smartWizard('setError',{stepnum:0,iserror:false});
       }
       
       if(validateStep2() == false){
         isStepValid = false;
         $('#smartwizard').smartWizard('setError',{stepnum:2,iserror:true});         
       }else{
         $('#smartwizard').smartWizard('setError',{stepnum:2,iserror:false});
          
       }
       
       if(!isStepValid){
          $('#smartwizard').smartWizard('showMessage','Please correct the errors in the steps and continue');
       }
              
       return isStepValid;
    }

        function validateSteps(step){
          var isStepValid = true;
      // validate step 1
      if(step == 0){
        // alert()
        if(validateStep1() == false ){
          isStepValid = false; 
          $('#smartwizard').smartWizard('showMessage','Please correct the errors in step'+step+ ' and click next.');
          $('#smartwizard').smartWizard('setError',{stepnum:step,iserror:true});         
        }else{
          $('#smartwizard').smartWizard('setError',{stepnum:step,iserror:false});
        }
      }
      
      // validate step2
      if(step == 1){
        if(validateStep2() == false ){
          isStepValid = false; 
          $('#smartwizard').smartWizard('showMessage','Please correct the errors in step'+step+ ' and click next.');
          $('#smartwizard').smartWizard('setError',{stepnum:step,iserror:true});         
        }else{
          $('#smartwizard').smartWizard('setError',{stepnum:step,iserror:false});
        }
      }
      
      return isStepValid;
    }

    function validateStep1(){
       var isValid = true; 
       // Validate Username
       if(!($('input#flexRadioDefault1').prop("checked") || $('input#flexRadioDefault2').prop("checked"))){
         isValid = false;
         $('#msg_dt').html('Please select mode of payment').show();
       }else{
         $('#msg_dt').html('').hide();
       }

       // validate fixed Amount
       var amt = $('#amountselect').val();
       if(!amt && amt.length <= 0){
         isValid = false;
         $('#msg_amt').html('Please select amount').show();         
       }else{
         $('#msg_amt').html('').hide();
       }
       
       // validate amount amount field
       var amt2 = $('#amount').val();
       if(!amt2 && amt2.length <= 0){
         isValid = false;
         $('#msg_amount').html('Please Enter Valid Amount').show();         
       }else{
         $('#msg_amount').html('').hide();
       }  
       
       return isValid;
    }
    

    //validate Second Step

    function validateStep2(){
       var isValid = true; 
       // declaring var and store inp value 
       var first_name = $('#first_name').val();
       var last_name = $('#last_name').val();
       var phone = $('#phone').val();
       var email = $('#email').val();
       var street_address = $('#street_address').val();
       var city = $('#city').val();
       var state_province_id = $('#state_province_id').val();
       var postal_code = $('#postal_code').val();
       // validate first name field
       if(!first_name && first_name.length <= 0){
         isValid = false;
         $('#first_name').addClass("border-danger");
         $('.errorf').html('first name is required').show();         

       }else{
         $('#first_name').removeClass("border-danger");
         $('.errorf').html('').hide();         
          
       }
       // validate last name field
       if(!last_name && last_name.length <= 0){
         isValid = false;
         $('#last_name').addClass("border-danger");
         $('.errorl').html('last name is required').show();         

       }else{
         $('#last_name').removeClass("border-danger");
         $('.errorl').html('').hide();         
          
       }
       // validate phone field
       if(!phone && phone.length <= 0){
         isValid = false;
         $('#phone').addClass("border-danger");
         $('.errorp').html('phone is required').show();         

       }else{
         $('#phone').removeClass("border-danger");
         $('.errorp').html('').hide();         
         
       }
       // validate email field
       if(email && email.length > 0){
         if(!isValidEmailAddress(email)){
           isValid = false;
           $('.errore').html('email is invalid').show();           
         }else{
          $('.errore').html('').hide();
         }
       }else{
         isValid = false;
         $('.errore').html('email is required').show();
       }  
       // validate street field
       if(!street_address && street_address.length <= 0){
         isValid = false;
         $('#street_address').addClass("border-danger");
         $('.errorsa').html('street address is required').show();         

       }else{
         $('#street_address').removeClass("border-danger");
         $('.errorsa').html('').hide();         

       }

       // validate city field
       if(!city && city.length <= 0){
         isValid = false;
         $('#city').addClass("border-danger");
         $('.errorc').html('city name is required').show();         

       }else{
         $('#city').removeClass("border-danger");
         $('.errorc').html('').hide();         
          
       }

       // validate state field
       if(!state_province_id && state_province_id.length <= 0){
         isValid = false;
         $('#state_province_id').addClass("border-danger");
         $('.errorpi').html('state is required').show();         

       }else{
         $('#state_province_id').removeClass("border-danger");
         $('.errorpi').html('').hide();         
        
       }
       // validate zip field
       if(!postal_code && postal_code.length <= 0){
         isValid = false;
         $('#postal_code').addClass("border-danger");
         $('.errorpc').html('postal code is required').show();         

       }else{
         $('.errorpc').html('').hide();         
         $('#postal_code').removeClass("border-danger");
       }

       
       return isValid;
    }

    // Email Validation
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      return pattern.test(emailAddress);
    } 


    //stripe
    // Create a Stripe client
var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

// Create an instance of Elements
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
var form = document.getElementById('btn-Stripe');
form.addEventListener('click', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {

        console.log(result.token)
        
        //submit form data
            var formData = {
              modeofpay: $('input#flexRadioDefault1').val(),
              modeofpay2: $('input#flexRadioDefault2').val(),
              selectamount:$('#amountselect').val(),
              amount:$('#amount').val(),
              first_name:$('#first_name').val(),
              last_name:$('#last_name').val(),
              phone:$('#phone').val(),
              email:$('#email').val(),
              street_address:$('#street_address').val(),
              city:$('#city').val(),
              state_province_id:$('#state_province_id').val(),
              postal_code:$('#postal_code').val()
            };
                console.log(formData);

            $.ajax({
                type: "POST",
                url: "process.php",
                data: formData,
                dataType: "json",
                encode: true,
              }).done(function (data) {
                console.log(data);
              });

              event.preventDefault();

    }
  });
});
       
});