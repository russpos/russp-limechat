(function() {

    var imgbase = "http://www.emoji-cheat-sheet.com/graphics/emojis/";

    var emojiMap = {
        "laughing":"satisfied",
        "hankey":"poop",
        "boom":"collision",
        "+1":"thumbsup",
        "-1":"thumbsdown",
        "facepunch":"punch",
        "hand":"raised_hand",
        "runner":"running",
        "mans_shoe":"shoe",
        "shirt":"tshirt",
        "bee":"honeybee",
        "dolphin":"flipper",
        "feet":"paw_prints",
        "moon":"waxing_gibbous_moon",
        "phone":"telephone",
        "hocho":"knife",
        "email":"envelope",
        "memo":"pencil",
        "book":"open_book",
        "boat":"sailboat",
        "car":"red_car",
        "izakaya_lantern":"lantern",
        "gb":"uk",
        "exclamation":"heavy_exclamation_mark",
        "shipit":"squirrel",
        "shit" : "poop"
    };

    // Inline styles to be added directly to our emoji images
    var styles = [
        "border: none",
        "box-shadow: none",
        "height: 24px",
        "width: 24px",
        "position: relative",
        "top: -2px",
        "left: -2px",
        "margin: 0",
        "padding: 0",
    ].join('; ');

    var aliases = {
        '+1': 'plus1'
    };

    document.addEventListener("DOMNodeInserted", function(e) {
        var line = e.target;
        var lineType = line.getAttribute("type");
        var line_Type = line.getAttribute("_type");

        if (lineType == 'privmsg' || line_Type == 'privmsg') {
            var msg = line.getElementsByClassName('message').item(0);
            var html = msg.innerHTML, emoji;

            // Store the original html of this message
            var ogHtml = html;

            // Find everything that looks like an emoji
            var matches = html.match(/:([\d\w\+\-_]+):/g);
            for (var i in matches) {
                var match = matches[i];

                // If it looks like ':00:', skip it, it's probably the middle of time (1:45:03pm)
                if (match.match(/:\d\d:/)) {
                    continue;
                }

                // If it looks like '://', it's probably the beginnig of a URL
                if (match.match(/:\/\//)) {
                    continue;
                }

                var emoji = match.replace(/:/g, ''),
                    emoji = aliases[emoji] || emoji,
                    icon = '<img class="inlineimage" src="' + imgbase + emoji + '.png' + '" title="' + emoji + '" style="' + styles +'">';
                html = html.replace(match, icon);
            }

            // If we've made any updates to the original HTML, update the dom node
            if (ogHtml !== html) {
                msg.innerHTML = html;
            }
        }

    }, false);
})();
