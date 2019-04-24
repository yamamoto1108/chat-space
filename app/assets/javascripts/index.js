$(function() {

  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
    search_list.append(html)
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }</div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: 'users/index',
      data: { keyword: input },
      datatype: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty()  //検索結果の削除
      if (users.length !== 0) {
        users.forEach(function(user) {
          apeendUser(user);
        });
      } else {
        appendErrMsgToHTML("一致するユーザーがありません");
      }
    })
  });
});
