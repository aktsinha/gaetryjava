// Copyright 2010 Google Inc. All Rights Reserved.

package myapp;

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
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
public class GetTokenServlet extends HttpServlet {
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    
    String channelKey = req.getParameter("channel");
    if(channelKey == null || channelKey.length() == 0){
      resp.setStatus(401);
      return;
    }
    ChannelService channelService = ChannelServiceFactory.getChannelService();
    resp.setContentType("text/plain");
    resp.getWriter().println(channelService.createChannel(channelKey));
    return;
  }
}