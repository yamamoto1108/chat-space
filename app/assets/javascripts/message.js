$(function() {
  $(document).on('turbolinks:load', function () {
    function buildHTML(message) {
      var img = (message.image.url == null)? `</p>`:`<img src ="${ message.image.url }"></p>`;
      var html = `<div class="message" data-id="${ message.id }">
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
    //form投稿内容を非同期で表示
    $('#new_message').on('submit', function(e) {
      e.preventDefault();  //HTML通信を止める
      var formData = new FormData(this);  //form入力内容取得
      var url = $(this).attr('action')  //form_forの遷移先url取得
      $.ajax({
        url: url,
        type: "POST",
        data: formData, //formDataをコントローラに送る
        dataType: 'json',
        processData: false,
        contentType: false
      })
  
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);  //.messagesにbuildHTMLの内容を追加
        $('#new_message')[0].reset();  //formを空にする
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
      })
  
      .fail(function(){
        alert('error');
      })
      return false; //連続投稿可能にする
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');  //現在画面に表示されている最後のメッセージidを定義。カスタムデータ取得
    group_id = $('.main-header__left-box__current-group').data('group-id');  //現在のグループidを定義。カスタムデータ取得
    var url = location.href;
    
    if (url.match(/\/groups\/\d+\/messages/)) {
      function buildHTML(message) {
        var img = (message.image.url == null)? `</p>`:`<img src ="${ message.image.url }"></p>`;
        var html = `<div class="message" data-id="${ message.id }">
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
      
      var api_url = '/groups/' + `${group_id}` + '/api/messages';
      $.ajax({
        url: api_url,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id, group_id: group_id}  //コントローラに渡すデータ
      })
  
      .done(function(messages) {
        console.log('success')
        var insertHTML = '';
        if (messages.length !== 0) {
          messages.forEach(function(message) {  //前回の通信時から追加されたmessageを一つずつ取り出す
            insertHTML += buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
          });
        }
      })
  
      .fail(function() {
        console.log('error')
      })
    }
  };
  setInterval(reloadMessages, 5000);  //5秒ごとに更新
});
