/*
 *                ...                                    .?..       ...:+.
 *                 :+:.                                   I8     .  .~+~..
 *                ..=++~..      ...      ...          .    I. ...:=+++:..
 *                ..:++++:.     .,+.     .=:         ..~+:.:..~++++++..  .
 *                  .++++++:.   ..++,.. .=+=.     ..,=++:. :+++++++=..
 *                   ~+++++++,.  ,+++. ..+++.     .~+++~.:~=+++++++...
 *                   ,+++++++++:.,++++~..+++:. ..~++++++++?++++++=.
 *                   .~++++++++++:+++++=~+++=.,=++++++++++Z+++++=.
 *         ...        .++++++++++++++=Z8I==N=++++++?Z~++++8++++=.
 *        .::.. .     .~+++++++++++=Z?,:,:,,,I===?Z.. N++=Z++++..
 *       .  .=+=:..    .=+++++++++++++=N~8I     .N=. .Z++=I++=..
 *           ..++++:... .+++++++++++=?I    ...IZZ Z8IZ =+?=++.
 *     . .     .:++++=~..~+++++++++N ..8 ..M.ZMMMMI.   :+Z=+~.
 *    .?N,N..  ..:+++++++++++++++++N  .8N ZMMMMMMMM     I8+=.             .    ...
 *  ,IN,:::=I  .. ,+++++++++++++++++~N:Z~MMMMMMMMMM8.   .$+... ....      ..,:=+=,
 *  :Z:::::::M .. ..:++++++++++++++++Z  ZMMMMMMMMMMM    ~++:~++++:......:++++~..
 *  .,::::::::N..,=++++++++++++++++++=Z.. NMMMMMMMMM.   8=+++++~. ..,=+++++:.  .
 *  .?,::::::::= ..:++++++++++++++++++~. . IMMMMMMMZ.  .$8=+++~..~+++++++,..
 *    Z,:::::::I.. .,++++++++++++++++++M.  :MMMMMMM , .87$?++~:++++++++:..
 *    .Z~:::,?8    . .:++++++++++++++~N~8  ~=ZMMM,, ..:7778++++++++++,.
 *     ....  NO8=..,,~~+++++++++++=8I++++8. . ::.  . .8777$=+++++++:. .
 *          .:$OO$++++++++++++++=$=++++++=M:    .  =8$77777?+++++=,.
 *     ........=NON=+++++++++~N=++++++++++=$7$$$$$7777777778++++~.,..........
 *      :+++++=:,NO8I++++++8I++++++++++++++O777777777777777$?++++++++++++++++++=,
 *      .:++++++++IOOZ++=Z=+++++++++++++++++87777777777777778++++++++++++++++++++:.
 *       .:++++++++=NOM~++++++++++++++++++++~777777777777777$++++++++++++++=~...  .
 *         =+++++++++NOOI++++++++++++++++++++8777777777777777=+++++++++~,.
 *         .~+++++++++?OOZ+++++++++++++++++++8777777777777777=+++++~,..
 *           =+++++++++=NON=+++++++++++++++++$777777777777777=++=. .
 *           .,++++++++++NOOI+++++++++++++++~7777777777777777=++++:
 * ...    . ...~+++++++++=8OO~++++++++++++++?7777777777777777=+++++,
 *
 * All the Images!: A very basic "all the images are loaded" plugin
 * by Ben Evans
 *
 * Usage:
 *
 *   $(element).allTheImgs(callback);
 *
 * Unusage:
 *
 *   $(element).data('allTheImgs').destroy();
 */
;(function($) {

  $.allTheImgs = function(element, callback) {

    var plugin = this,
      $_element, $_images, numImages, numImagesLoaded, numImagesVisible;

    var init = function() {
      $_element = $(element);
      $_images = $_element.find('img');
      numImagesLoaded = 0;
      numImagesVisible = null;
      if (numImages === 0) {
        callback.call();
      } else {
        $_images.on('load error', checkLoaded);
      }
    };

    var checkLoaded = function() {
      numImagesLoaded++;
      if (numImagesVisible === null || numImagesVisible !== numImages) {
        numImagesVisible = $_element.find('img').filter(':visible').length;
        if (numImagesVisible !== numImages) {
          numImages = numImagesVisible;
        }
      }
      if (numImages === numImagesLoaded) {
        callback.call();
      }
    };

    plugin.destroy = function() {
      $_images.off('load error', checkLoaded);
      $_element.removeData('allTheImgs');
    };

    init();
  };

  $.fn.allTheImgs = function(options) {
    return this.each(function() {
      if ($(this).data('allTheImgs') === undefined) {
        var plugin = new $.allTheImgs(this, options);
        $(this).data('allTheImgs', plugin);
      }
    });
  };

}(jQuery));
