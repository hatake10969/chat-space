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

});