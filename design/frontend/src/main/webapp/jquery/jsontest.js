﻿var game = {};
game.deck = ['Kralj', 'Dama', 'Dečko'];

$(function () {
    "use strict";

    game.deck.sort();
    for(var i=0;i<2;i++){
        $(".card:first-child").clone().appendTo("#cards");
    }

    $("#cards").children().each(function(index) {

        $(this).css({"left" : ($(this).width() + 20) * (index % 4), "top" : ($(this).height() + 20) * Math.floor(index / 4)
        });

        //game.timer = setInterval(gameloop,5000);

        var pattern = game.deck.pop();
        $(this).find(".back").addClass(pattern);
        $(this).attr("data-pattern",pattern);
        $(this).click(selectCard);
    });

    var content = $('#console');
    var socket = $.atmosphere;
    var request = { url: document.location.toString() + 'chat', //ovaj url kasnije promijeniti u web.xml
                    contentType : "application/json",
                    logLevel : 'debug',
                    transport : 'websocket' ,
                    fallbackTransport: 'long-polling'};


    request.onOpen = function(response) {
        content.html($('<p>', { text: 'Uskoci connected using ' + response.transport }));
    };

    request.onMessage = function (response) {
        var message = response.responseBody;
        try {
            var json = jQuery.parseJSON(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        addMessage(json.text);

    };


    request.onError = function(response) {
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
            + 'socket or the server is down' }));
    };

    var subSocket = socket.subscribe(request);

    function selectCard() {
    		var msg = $(this).attr("data-pattern");
            subSocket.push(jQuery.stringifyJSON({message: msg}));
    }

    function addMessage(message) {
          $("#cards").find('*[data-pattern="' + message + '"]').toggleClass("card-flipped")
          $('#console').append("<p>Odabrano: " + message + "</p>");
    }
});