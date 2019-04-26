$(function() {
  $(document).on('turbolinks:load', function () {

    var search_list = $("#user-search-result");
    var selected_list = $("#chat-group-users");

    function appendList(user) {
      var html = `<div class="chat-group-user clearfix search">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="${ user.id }" data-user-name="${ user.name }">追加</div>
                  </div>`
      search_list.append(html)
    }

    function appendUser(user) {
      var html = `<div class='chat-group-user clearfix js-chat-member' id='${ user.name }'>
                    <input name='group[user_ids][]' type='hidden' value='${ user.name }'>
                    <p class='chat-group-user__name'>${ user.name }</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' id='${ user.name }'>削除</div>
                  </div>`
      selected_list.append(html)
    }

    function appendErrMsgToHTML(msg) {
      var html = `<div class="chat-group-user clearfix">${ msg }</div>`
      search_list.append(html);
    }

    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty()
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendList(user);
            
            $(".chat-group-user.clearfix.search").on("click", `#${user.id}`, function() {
              appendUser(user);
              $(".chat-group-user.clearfix.search").remove();
            });

            $(".chat-group-user.clearfix.js-chat-member").on("click", `#${user.name}`, function() {
              $(`#${user.name}`).remove();
            });
            
          });
          
        } else {
          appendErrMsgToHTML("一致するユーザーがありません");
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
  });
});
