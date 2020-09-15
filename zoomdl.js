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
})();
