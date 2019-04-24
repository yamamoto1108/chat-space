$(function() {
  $(document).on('turbolinks:load', function () {
    function buildHTML(message) {
      var img = ""
      console.log(message.image)
        if (message.image !== null) {
          img = `<img src ="${ message.image.url }"></p>`
        } else {
          img = `</p>`
        }
      var html = `<div class="message">
                    <p class="message__user">
                      ${ message.user_name }
                    </p>
                    <p class="message__date">
                      ${ message.created_at }
                    </p>
                    <p class="message__text">
                      ${ message.body }
                      <br>
                      ${ img }
                  </div>`
      return html;
    }
 
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      // console.log(url)
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
  
      .done(function(data){
        // console.log(data)
        var html = buildHTML(data);
        $('.messages').append(html)
        $('.box__text').val('')
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
      })
  
      .fail(function(){
        alert('error');
      })
    });
  });
});