var Nightmare = require('nightmare');
var fs = require('fs');
var http = require('http');

var bandcamp = new Nightmare()
    .viewport(1000, 1000)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto('http://aerotrak.bandcamp.com/album/at-ease')
    .wait()
    .screenshot('bandcamp1.png')
    .click('h4.ft button.download-link')
    .screenshot('bandcamp2.png')
    .type('#userPrice', '0')
    .wait(500)
    .screenshot('bandcamp3.png')
    .click('#downloadButtons_download button')
    .wait()
    .wait(1000)
    .screenshot('bandcamp4.png')
    .evaluate(function () {
      return {
        name: $('.downloadItemTitle').text().trim(),
        href: $('.downloadGo').prop('href').trim()
      };
    },function (value) {
        var filename = './' + value.name + '.zip';
        var file = fs.createWriteStream(filename);
        var request = http.get(value.href, function (response) {
          response.pipe(file);
        });
      }
    )
    .run(function (err, nightmare) {
      if (err) return console.log(err);
      console.log('Done!');
    });
