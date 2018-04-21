runtime.command({
    action: 'getTabErrors'
}, function(response) {
    if (!response.tabError || response.tabError.length === 0) {
        window.location.href = chrome.extension.getURL("pages/options.html");
    } else {
        var tabError = response.tabError[0];
        document.querySelector('#main-message .error-code').innerHTML = tabError.error;
        var a = document.querySelector('#main-message a');
        a.innerHTML = tabError.url;
        a.setAttribute('href', tabError.url);
        var host = tabError.url.replace(/^\w+:\/\/([^\/]+)\/.*$/i, "$1");
        if (/.*\..*\./.test(host)) {
            host = host.replace(/^[^\.]*\./, '');
        }
        document.getElementById('errorHost').innerHTML = host;
        var wrapper = document.querySelector('div.interstitial-wrapper');
        wrapper.style.margin = `15% calc(50% - ${wrapper.offsetWidth / 2}px)`;;

        mapkey('r', 'reload', function() {
            window.location.href = tabError.url;
        });
        mapkey('p', 'toggle proxy', function() {
            RUNTIME('updateProxy', {
                host: host,
                operation: 'toggle'
            });
        });
    }
});
