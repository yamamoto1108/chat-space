$(function() {
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
  })
})