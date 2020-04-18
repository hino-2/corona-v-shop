export function ecomStartWidget(options) {
  // Creating iframe
  const widgetIframe = document.createElement('iframe');
  widgetIframe.setAttribute('allowtransparency', 'true');
  widgetIframe.setAttribute('scroll', 'false');
  widgetIframe.setAttribute('frameborder', '0');
  widgetIframe.setAttribute('width', '100%');
  widgetIframe.setAttribute('height', '100%');
  widgetIframe.src = 'https://widget.pochta.ru/map/';

  // Adding iframe to container
  console.log(options);
  const container = document.getElementById(options.containerId);
  container.appendChild(widgetIframe);

  // Adding an event which wating for a message from the map that it's ready
  window.addEventListener('message', event => {
    if (event.data) {
      if (event.data.isLoad) {
        try {
          widgetIframe.contentWindow.postMessage(
            {
              postData: {
                siteId: options && options.id,
                url: window.location.href
              }
            },
            '*'
          );
        } catch (error) {}
      }
    }

    if (event.data.pvzData) {
      options.callbackFunction(event.data.pvzData);
    }
  });
}
