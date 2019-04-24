$(function() {
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
