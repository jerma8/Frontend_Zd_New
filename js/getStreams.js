$(document).ready(function(){

    //change filter img to X
    $('.filterImg').click(function() {
        var clicks = $(this).data('clicks');

        if (clicks) {
            closeLeftSidebar();
        }else{
            $('.filterImg').attr('src', 'img/X.png');
            $('.leftSidebar').addClass('come-in-left');
            $('.blurDiv').addClass('is-active');
            $('.push').addClass('push-left');
        }

        $(this).data("clicks", !clicks);
    });


    //change img menu src to X
    $('.menuImg').click(function() {
        var clicks = $(this).data('clicks');

        if (clicks) {
            closeRightSidebar();
        }else{
            $('.menuImg').attr('src', 'img/X.png');
            $('.rightSidebar').addClass('come-in-right');
            $('.blurDiv').addClass('is-active');
            $('.push').addClass('push-right');
        }

        $(this).data("clicks", !clicks);
    });


    // FUNCTIONS FOR CLOSE SIDEBARS //
    function closeLeftSidebar(){
        $('.filterImg').attr('src', 'img/filter.png');
        $('.leftSidebar').removeClass('come-in-left');
        $('.blurDiv').removeClass('is-active');
        $('.push').removeClass('push-left');
    }

    function closeRightSidebar(){
        $('.menuImg').attr('src', 'img/menu.png');
        $('.rightSidebar').removeClass('come-in-right');
        $('.blurDiv').removeClass('is-active');
        $('.push').removeClass('push-right');
    }
    // END FUNCTIONS FOR CLOSE SIDEBARS //


    //pop_up modal
    $('.modal').hide();
    $('.modal').css("height",$(window).height());


    //close pop_up and stop video setting scr to ''
    $('.closePop_up').on('click',function() {
        $('.menu').show();
        $('.modal').hide();
        $('.playerVideo').attr('src', '');
        onlyOnce=0;
    });



    // Variable za getJSON //
    var streams = 'https://api.twitch.tv/kraken/streams';
    var streamInfo = {};

    var language = [];
    var games = [];
    var lng; //pomocna var za fillLanguage

    var gameSearchName = '';
    var languageSearch = '';

    var onlyOnce = 0;


    //prvi puta prima streams, svaki sljedeći novi url
    getStreams(streams,'','');

    function getStreams(streamUrl,game,language){

        //Start $.getJSON
        $.getJSON(streamUrl,function(data){

            //Append loop
            for(var streamNum in data.streams) {
                streamInfo = data.streams[streamNum].channel;

                if(game == '' && language == '')
                    append();
                else if(language == '' && game != '' && game == streamInfo['game'])
                    append();
                else if(game == '' && language != '' && language == streamInfo['language'])
                    append();


                //punjenje filtera samo prvi puta
                if (streamUrl == streams) {
                    fillLanguage();
                    fillGames();
                }

            }
            //End Append loop




            //Postavljanje next link radi load more buttona
            $('.loadMore').attr('data-link', data._links['next']);




            // CHECKBOX LANGUAGES //
            $('input[name="language[]"]').on('change', function () {

                $('input[name="language[]"]').not(this).prop('checked', false);
                $("#content").html('');

                //prodi samo jednom
                if(onlyOnce === 0){

                    if ($(this).attr('data-language') != languageSearch)
                        languageSearch = $(this).attr('data-language');
                    else
                        languageSearch = '';

                    //ako uncheckiramo language, a pri tome nismo odabrali igru, trazi po pocetnom url-u
                    if($('input[name="language[]"]:checked').length == 0 && gameSearchName == ''){
                        getStreams(streams,'','');
                    }

                    //ako uncheckiramo language, a pri tome je odabrana igra, trazi po igri
                    else if($('input[name="language[]"]:checked').length == 0 && gameSearchName != ''){
                        getStreams(streams + '?game=' + gameSearchName,'','');
                    }

                    //ako checkiramo language, a pri tome nije odabrana igra, trazi po jeziku
                    else if (languageSearch != '' && gameSearchName == '') {
                        getStreams(streams + '?language=' + languageSearch,'','');
                    }

                    //ako checkiramo language, a pri tome je odabrana igra, posalji url checkiranog jezika i trazi po igri
                    else if (languageSearch != '' && gameSearchName != '') {
                        getStreams(streams + '?language=' + languageSearch,gameSearchName,'');
                    }

                }

                onlyOnce = 8;
                closeLeftSidebar();
            });
            // END CHECKBOX LANGUAGES //




            // CHECKBOX GAMES //
            $('input[name="game[]"]').on('click', function () {

                $('input[name="game[]"]').not(this).prop('checked', false);
                $("#content").html('');

                if(onlyOnce === 0){

                    if ($(this).attr('data-game') != gameSearchName)
                        gameSearchName = $(this).attr('data-game');
                    else
                        gameSearchName = '';

                    //ako uncheckiramo game, a pri tome nismo odabrali language, trazi po pocetnom url-u
                    if($('input[name="game[]"]:checked').length == 0 && languageSearch == ''){
                        getStreams(streams,'','');
                    }

                    //ako uncheckiramo game, a pri tome je odabran jezik, trazi po jeziku
                    else if($('input[name="game[]"]:checked').length == 0 && languageSearch != ''){
                        getStreams(streams + '?language=' + languageSearch,'','');
                    }

                    //ako checkiramo game, a pri tome nije odabran jezik, trazi po game
                    else if (gameSearchName != '' && languageSearch == '') {
                        getStreams(streams + '?game=' + gameSearchName,'','');
                    }

                    //ako checkiramo game, a pri tome je odabran jezik, posalji url checkiranog gamea i trazi po jeziku
                    else if (gameSearchName != '' && languageSearch != '') {
                        getStreams(streams + '?game=' + gameSearchName,'',languageSearch);
                    }

                }

                onlyOnce = 8;
                closeRightSidebar();
            });
            // END CHECKBOX GAMES //




            //VIDEO STREAM
            $('.streamVideo').on('click',function() {
                var src = 'http://player.twitch.tv/?channel=' + $(this).attr('data-id');
                if(onlyOnce === 0)
                    $('.playerVideo').attr('src', src);
                onlyOnce=onlyOnce-1111;
                $('.modal').show();
                $('.menu').hide();
            });
            //END VIDEO STREAM




            $('.loadMore').click(function () {

                var nextLink = $(this).attr('data-link');
                if (onlyOnce === 0) {
                    //Provjeri da li nextLink sadrzi language ili game ili nijedno
                    if (nextLink.indexOf('language') != -1){
                        getStreams($(this).attr('data-link'),gameSearchName,'');
                    }
                    else if (nextLink.indexOf('game') != -1){
                        getStreams($(this).attr('data-link'),'',languageSearch);
                    }else {
                        getStreams($(this).attr('data-link'), '', '');
                    }

                }
                onlyOnce = 8;
            });



//Odradi samo jednom - mora ici i .done i .complete. Bez .done ne radi check/uncheck/check na istu igru
        }).done(function() {
            onlyOnce = 0;
        }).complete(function() {
            onlyOnce = 0;
        });

    }
    //End $.getJSON



//----    FUNCTIONS    ----//

    // FUNCTION APPEND CONTENT//
    function append(){

        var date = formatDate();

        $("#content").append(
            '<div data-id="' + streamInfo['name'] + '" class="streamVideo col3lg col3md col5sm col8xs col8xs col_lg_offSet_1 col_md_offSet_1 col_sm_offSet_1 stream '+ streamInfo['language'] +'">' +

            '<div style="background-image: url(' + streamInfo['profile_banner'] + ');" class="row profilBanner">' +
            '<div class="profilBannerTop">' +
            '<div class="row profilBannerContent">' +
            '<div class="col3lg col2md col1sm col2xs">' +
            '<img class="img-responsive" src=\"' + streamInfo['logo'] + '\"  alt=""/>' +
            '</div>' +
            '<div class="col6lg col5md col5sm col4xs">' +
            '<h4>' + streamInfo['display_name'] + '</h4>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="row videoBanner">' +
            '<img src=\"' + streamInfo['video_banner'] + '\" alt=\"\">' +
            '</div>' +

            '<div class="row game">' +
            '<div style="font-size: ' + '12px;' + '" class="row gameName">' +
            '<h3>' + streamInfo['game'] + '</h3>' +
            '</div>' +
            '<div class="row gameViewers">' +
            '<div class="col8lg">' +
            '<div class="col1lg">' +
            '<label><img src="img/viewers.png" alt=""></label>' +
            '</div>' +
            '<div class="col4lg gameViews">' +
            '<label>' + streamInfo['views'] + '</label>' +
            '</div>' +
            '<div class="col6lg gameViewersDate">' +
            '<label class="dot">&#183;</label><label>' + date + '</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );

    }
    //END FUNCTION APPEND CONTENT//



    // FUNCTION FORMAT DATE - INSIDE FUNCION append()//
    function formatDate(){

        // Date format FEB 11, 2016
        var month = streamInfo['updated_at'].substr(5,2);

        switch (month){
            case '01':
                month = 'JAN ';
                break;
            case '02':
                month = 'FEB ';
                break;
            case '03':
                month = 'MAR ';
                break;
            case '04':
                month = 'APR ';
                break;
            case '05':
                month = 'MAY ';
                break;
            case '06':
                month = 'JUN ';
                break;
            case '07':
                month = 'JUL ';
                break;
            case '08':
                month = 'AUG ';
                break;
            case '09':
                month = 'SEP ';
                break;
            case '10':
                month = 'OCT,';
                break;
            case '11':
                month = 'NOV,';
                break;
            case '12':
                month = 'DEC,';
                break;
            default :
                month = '';
        }

        var date = month + streamInfo['updated_at'].substr(8,2)+ ', ' + streamInfo['updated_at'].substr(0,4);

        return date;
    }
    //END FUNCTION FORMAT DATE//



    //FUNCTION FILL LANGUAGE FOR FIRST TIME ONLY
    function fillLanguage(){
        if (jQuery.inArray(streamInfo['language'], language) == -1) {
            //if the element is not in the array
            language.push(streamInfo['language']);
            switch (streamInfo['language']) {
                case 'en':
                    lng = "ENGLISH";            break;
                case 'de':
                    lng = "GERMAN";             break;
                case 'hr':
                    lng = "CROATIAN";           break;
                case 'it':
                    lng = "ITALIAN";            break;
                case 'fr':
                    lng = "FRENCH";             break;
                case 'ru':
                    lng = "RUSSIAN";            break;
                case 'pl':
                    lng = "POLISH";             break;
                case 'es':
                    lng = "SPANISH";            break;
                case 'tr':
                    lng = "TURKISH";            break;
                case 'nl':
                    lng = "NETHERLANDS";        break;
                case 'pt':
                    lng = "PORTUGUESE";         break;
                case 'pt-br':
                    lng = "PORTUGUESE (BRAZIL)";break;
                case 'zh-tw':
                    lng = "CHINESE (TAIWAN)";   break;
                default:
                    lng = streamInfo['language'].toUpperCase();    break;
            }
            $('#selectLanguage').append(
                '<li><label for=\"' + lng + '\">' + lng + '</label><input data-language="'+ streamInfo['language'] +'" type=\"checkbox\" name=\"language[]\" id=\"' + lng + '\" value=\"' + streamInfo['language'] + '\"/></li>'
            );
        }
    }
    //END FUNCTION FILL LANGUAGE



    //FUNCTION FILL GAMES FOR FIRST TIME ONLY
    function fillGames(){
        if (jQuery.inArray(streamInfo['game'], games) == -1) {
            // the element is not in the array
            games.push(streamInfo['game']);

            $('#games').append(
                '<li><input data-game="'+ streamInfo['game'] +'" class="gameCheck" type="checkbox" id="' + streamInfo['game'] + '" name="game[]" value="' + streamInfo['game'] + '"/><label for="' + streamInfo['game'] + '" class="sidebarGames">' + streamInfo['game'] + '</label></li>'
            );

        }
    }
    //END FUNCTION FILL GAMES

//----    END FUNCTIONS    ----//
});