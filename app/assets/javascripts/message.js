$(function() {
  $(document).on('turbolinks:load', function () {
    function buildHTML(message) {
      var img = (message.image.url == null)? `</p>`:`<img src ="${ message.image.url }"></p>`;
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
      e.preventDefault();  //HTML通信を止める
      var formData = new FormData(this);  //form入力内容取得
      var url = $(this).attr('action')  //form_forの遷移先url取得
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
  
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
      })
  
      .fail(function(){
        alert('error');
      })
      return false; //連続投稿可能にする
    });
  });
});
