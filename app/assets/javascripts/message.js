$(function() {
  function buildHTML(message) {
    var html = `.message
                  %p.message__user
                    = message.user.name
                  %p.message__date
                    = message.created_at.strftime("%Y/%m/%d %H:%M")
                  %p.message__text
                    = message.body
                    %br
                    = image_tag message.image.url if message.image.present?`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
})