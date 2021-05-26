window.Parsley.addValidator("requiredIf", {
  validateString : function(value, requirement) {
    debugger
    if (jQuery(requirement).val()){
      return !!value;
    }

    return true;
  },
  priority: 33
})
$(function () {
  let $sections = $('.section');

  function navigateTo(index) {
    // Mark the current section with the class 'current'
    $sections
    .removeClass('current')
    .eq(index)
    .addClass('current');
    // Show only the navigation buttons that make sense for the current section:
    $('.form-navigation .previous').toggle(index > 0);
    var atTheEnd = index >= $sections.length - 1;
    $('.form-navigation .next').toggle(!atTheEnd);
    $('.form-navigation [type=submit]').toggle(atTheEnd);
  }

  function curIndex() {
    // Return the current index by looking at which section has the class 'current'
    return $sections.index($sections.filter('.current'));
  }

  // Previous button is easy, just go back
  $('.form-navigation .previous').click(function() {
    navigateTo(curIndex() - 1);
  });

  // Next button goes forward iff current block validates
  $('.form-navigation .next').click(function() {
    $('#donationForm').parsley({
      trigger: 'change',
      successClass: 'is-valid',
      errorClass: 'is-invalid',
      classHandler: function(el){
        return el.$element.closest('.igw')
      },
      errorsWrapper: '<p class="invalid-feedback"><p>',
      errorTemplate: '<span></span>'

    }).whenValidate({
      group: 'block-' + curIndex()
    }).done(function() {
      navigateTo(curIndex() + 1);
    });
  });

  $sections.each(function(index, section) {
    $(section).find(':input').attr('data-parsley-group', 'block-' + index);
  });
  navigateTo(0); // Start at the beginning
});