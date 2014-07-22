// Copyright 2010 Google Inc. All Rights Reserved.

package myapp;

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author moishel@google.com (Your Name Here)
 *
 */
public class MessageServlet extends HttpServlet {
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    
    String channelKey = req.getParameter("channel");
    String message = req.getParameter("message");
    if(channelKey == null || channelKey.length() == 0){
      resp.setStatus(401);
      return;
    }
    if(message == null || message.length() == 0){
      resp.setStatus(401);
      return;
    }
    ChannelService channelService = ChannelServiceFactory.getChannelService();
    channelService.sendMessage(new ChannelMessage(channelKey, message));
    resp.setContentType("text/plain");
    resp.getWriter().println("ok"+message+"END");
    return;
  }
}