var jquery = require('jquery')
// jquery allows easy selection of css/html elements in the dom
var Nightmare = require('nightmare')

var nightmare = Nightmare()
var url="http://washingtondc.craigslist.org/"


  nightmare.goto(url)
  //loads craigslist home page

    .wait(500)
    //waits 1/2 of a second for the page to load
    .click('#post')
    //clicks 'post to classifieds' (#post)
    .click('input[value=fso]')
    //clicks the for sale by owner radio button
    .click('.pickbutton')
    //clicks the continue button
    .wait(500)
    //waits 1 second for the page to load
    .click('label:nth-of-type(22)')
    //clicks the electronics by owner radio button
    .wait(500)
    //waits 1/2 of a second for the page to load
    .click('label:nth-of-type(3)')
    //clicks on Maryland as the location
    .click('.pickbutton')
    //clicks continue







    //var user= process.argv[2]
    //var pass= process.argv[3]

    //.type('#inputEmailHandle', process.argv[2])
    //.type('#inputPassword', process.argv[3])

    //.click('button.accountform-btn')
    //wait 1 second for page to loaded

    //.evaluate(
    //  function(){
    //    $("#attached_docs[value='fso']").attr('checked', true);
    //  }
    //  )
    .wait(1000)
    .screenshot('test.png')
    //.click('button.pickbutton')



    .end()

    .then(function(result){
      //console.log(test);
    })
