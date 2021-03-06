$(document).ready(function() {
  var sessionKey = $('#sessionKey').text();
  socket = new WebSocket("ws://" + window.location.host + "/chat" + window.location.pathname);

  socket.onmessage = function(message) {
      console.log(message);
      var data = JSON.parse(message.data);
      var html = "S:" + data.user + "<br> Text:" + data.text + "<br><br>";
      $("#messages").append(html);
  }

  socket.onopen = function() {
      console.log("socked opened");
  }

  // Call onopen directly if socket is already open
  if (socket.readyState == WebSocket.OPEN) socket.onopen();

  $("#messageInput").on('keypress', function(e) {
    if (e.which == 13) {
      var message = {
          user: $('#user').text(),
          message: $('#messageInput').val()
      }

      socket.send(JSON.stringify(message));
      $(this).val('');

      return false;
    }
  });
});
