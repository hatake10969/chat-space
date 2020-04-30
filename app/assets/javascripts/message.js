$(function(){

  function buildHTML(message){
    if (message.image) {
      var html =
      `<div class="message">
        <div class="message__info">
          <div class="message__info__name">
            ${message.user_name}
          </div>
          <div class="message__info__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
    } else {
      var html =
      `<div class="message">
        <div class="message__info">
          <div class="message__info__name">
            ${message.user_name}
          </div>
          <div class="message__info__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    };
    return html
  }

  function buildHTML(message) {
    if ( message.image ) {
      //data-idが反映されるようにしている
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__name">
              ${message.user_name}
            </div>
            <div class="message__info__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      //同様にdata-idが反映されるようにしている
      var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__info">
           <div class="message__info__name">
             ${message.user_name}
           </div>
           <div class="message__info__time">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.submit-btn').removeAttr('data-disable-with');
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
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });

  var reloadMessages = function() {

    var last_message_id = $('.message:last').data("message-id");
    $.ajax( {
      url: "api/messages",
      type: "GET",
      data: { id: last_message_id },
      dataType: "json"
    })
    .done(function(messages) {
      if (messages !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("error");
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});