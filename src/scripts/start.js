var appWindow;

chrome.app.runtime.onLaunched.addListener(function( launchData ) {

  if (appWindow && !appWindow.contentWindow.closed) {
    appWindow.focus();
    appWindow.drawAttention();
    return true;
  }

  chrome.app.window.create('who.html', {
    width: 680,
    height: 580,
    minWidth: 640,
    minHeight: 440,
    //frame: "none",
    type: 'shell'
  }, function( win ) {
    appWindow = win;
  });
});
