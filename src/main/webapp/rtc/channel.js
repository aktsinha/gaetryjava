var gaeChannel = gaeChannel || {};

//var token, channelId;
gaeChannel.sendMessage = function (channelId, message, callback){
  message = JSON.stringify({'body':message});
  $.post( "/message", { 'channel': channelId, 'message': message }, function( data ) {
    console.log("message response: " + data);
    //$( "#result2" ).html( data );
    if ('function' === typeof callback){
      callback();
    }
  });
};
    
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*
$(document).ready(function() {
  $('input#mybutton').click(function() {
      var message = $('textarea#mytextarea').val();
      console.log("text to send:" + message);
      
      var channelId = $('input#channelBox').val();
      console.log("Channel Id" + channelId);
      
      if(!channelId) {
        alert("Please enter a channel Id");
        return;
      }
      
      gaeChannel.sendMessage(channelId, message);
  });
});
*/

gaeChannel.openSocket = function (callback) {
  $.post( "/token", { 'channel': gaeChannel.channelId }, function( data ) {
    console.log("token: " + data);
    //$( "#result1" ).html( data );
    gaeChannel.token = JSON.parse(data).token;
    
    gaeChannel.channel = new goog.appengine.Channel(gaeChannel.token);
    gaeChannel.socket = gaeChannel.channel.open();
    gaeChannel.socket.onopen = function(){
      console.log("opened");
      if ('function' === typeof callback){
        callback();
      }
    };
    gaeChannel.socket.onmessage = function(message){
      console.log("message: ");
      console.log(JSON.parse(message.data).body);
      if ('function' === typeof gaeChannel.onmessage){
        gaeChannel.onmessage(JSON.parse(message.data).body);
      }
      //$( "#result3" ).html( message.data );
    };
    gaeChannel.socket.onerror = function(error){
      console.log("error: ");
      console.log(error);
    };
    gaeChannel.socket.onclose = function(){
      console.log("closed");
    };
    
  });
}

$(document).ready(function() {
  gaeChannel.channelId = getParameterByName('channel');
  gaeChannel.channelId = gaeChannel.channelId || '999';
  
  gaeChannel.peer = getParameterByName('peer');
  gaeChannel.peer = gaeChannel.peer || '111';
  
  gaeChannel.openSocket();
});