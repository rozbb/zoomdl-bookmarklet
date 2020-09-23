// NOTE: This is the contents of the bookmarklet. Bookmarklets cannot have comments in them, so make
// sure to strip all comments before pasting into your web browser

javascript:(function(){
    // A unique ID for the link added to the page
    const download_link_id = "__zoomdl_link";

    // Check that
    //   1. We're on a zoom.us subdomain, and
    //   2. We haven't already inserted the download link
    if (!window.location.hostname.endsWith("zoom.us")
        || document.getElementById(download_link_id)) {
        return;
    }

    // The ID of the MP4 source in Zoom recordings
    const video_url = document.getElementById("vjs_video_3_html5_api").src;

    // Make an <a> tag
    var download_link = document.createElement("a");
    download_link.id = download_link_id;
    download_link.href = video_url;
    download_link.innerHTML = "Download Video (right click → Save Link As)";
    download_link.style = "font-weight: bold";
    // The link cannot download on left-click because it's a cross-origin link. If you try
    // left-clicking, you just get an "Access Denied" page. So we disable left-click altogether.
    download_link.onclick = function() { return false; };

    // Insert the link just above the video
    var container = document.getElementsByClassName("main")[0];
    container.prepend(download_link);

    // Zoom disabled right-click on their website. Everything below is just to re-enable it. Thanks
    // to Chema for their answer on SuperUser
    // https://superuser.com/questions/279166/how-do-i-set-google-chrome-to-not-allow-javascript-to-hijack-my-right-click-menu

    function enableContextMenu(aggressive = false) {
        void(document.ondragstart = null);
        void(document.onselectstart = null);
        void(document.onclick = null);
        void(document.onmousedown = null);
        void(document.onmouseup = null);
        void(document.body.oncontextmenu = null);
        enableRightClickLight(document);
        if (aggressive) {
            enableRightClick(document);
            removeContextMenuOnAll("body");
            removeContextMenuOnAll("img");
            removeContextMenuOnAll("td");
        }
    }

    function removeContextMenuOnAll(tagName) {
        var elements = document.getElementsByTagName(tagName);
        for (var i = 0; i < elements.length; i++) {
            enableRightClick(elements[i]);
        }
    }

    function enableRightClickLight(el) {
        el || (el = document);
        el.addEventListener("contextmenu", bringBackDefault, true);
    }

    function enableRightClick(el) {
        el || (el = document);
        el.addEventListener("contextmenu", bringBackDefault, true);
        el.addEventListener("dragstart", bringBackDefault, true);
        el.addEventListener("selectstart", bringBackDefault, true);
        el.addEventListener("click", bringBackDefault, true);
        el.addEventListener("mousedown", bringBackDefault, true);
        el.addEventListener("mouseup", bringBackDefault, true);
    }

    function restoreRightClick(el) {
        el || (el = document);
        el.removeEventListener("contextmenu", bringBackDefault, true);
        el.removeEventListener("dragstart", bringBackDefault, true);
        el.removeEventListener("selectstart", bringBackDefault, true);
        el.removeEventListener("click", bringBackDefault, true);
        el.removeEventListener("mousedown", bringBackDefault, true);
        el.removeEventListener("mouseup", bringBackDefault, true);
    }

    function bringBackDefault(event) {
        event.returnValue = true;
        (typeof event.stopPropagation === 'function') && event.stopPropagation();
        (typeof event.cancelBubble === 'function') && event.cancelBubble();
    }

    // Enable right click
    enableContextMenu();
})();
