let grid_container = $('.grid-container')
let amongUsImages = ['astrologian', 'bard', 'black_mage', 'blue_mage', 'dancer', 
                'dark_knight', 'Dragoon', 'gun', 'gunbreaker', 'monk', 'ninja', 
                'paladin', 'red_mage', 'samurai', 'scholar', 'summoner', 
                'warrior', 'white_mage']
let maplestory_images = ['horny_mushroom', 'berserk_horny_mushroom', 'stump', 
                'dessert_rabbit', 'laloong','moon_bunny', 'peace_spirit', 'pepe', 
                'racoco', 'red_snail', 'shroom', 'swamp_monster']
let back_image = 'none'
let clickedCard = null 
let clicked_id = null 
let canClick = false 
let matched = 0
let curr_asset = 'among_us_assets'
let selected_images = amongUsImages
let p1_score = 0
let p2_score = 0
let p1_game_score = 0
let p2_game_score = 0
let curr_player = 'player2'
let initial_state = "\
<div class='initial-card' id='1'></div>\
<div class='initial-card' id='2'></div>\
<div class='initial-card' id='3'></div>\
<div class='initial-card' id='4'></div>\
<div class='initial-card' id='5'></div>\
<div class='initial-card' id='6'></div>\
<div class='initial-card' id='7'></div>\
<div class='initial-card' id='8'></div>\
<div class='initial-card' id='9'></div>\
<div class='initial-card' id='10'></div>\
<div class='initial-card' id='11'></div>\
<div class='initial-card' id='12'></div>\
<div class='initial-card' id='13'></div>\
<div class='initial-card' id='14'></div>\
<div class='initial-card' id='15'></div>\
<div class='initial-card' id='16'></div>\
<div class='initial-card' id='17'></div>\
<div class='initial-card' id='18'></div>\
<div class='initial-card' id='19'></div>\
<div class='initial-card' id='20'></div>\
<div class='initial-card' id='21'></div>\
<div class='initial-card' id='22'></div>\
<div class='initial-card' id='23'></div>\
<div class='initial-card' id='24'></div>\
"

function rand(max) {
    return Math.floor(Math.random() * max);
}

//picks desired amount of random images from your available assets
const pickRandomImages = (images, numberOfPairs) => {
    let currentImages = new Set();
    while (numberOfPairs !== 0) {
        let image = images[rand(images.length)];
        if (currentImages.has(image)){
            continue;
        }
        else {
            currentImages.add(image);
        }
        numberOfPairs--;
    }
    return Array.from(currentImages);
}

// shuffle referenced from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    console.log(array);
    // dup values in array to get two of the same card in array
    let res = array.slice()
    for (let i=0; i < array.length; i++){
        res.push(array[i])
    }

    // randomize values
    let currentIndex = res.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = res[currentIndex];
        res[currentIndex] = res[randomIndex];
        res[randomIndex] = temporaryValue;
    }
    console.log(res);
    return res;
}

const dropdownListener = () => {
    $('.dropbtn').on('click', () => {
        $('.dropdown-content').toggle();
    });
}

const dropdownOptionsListners = () => {
    $('#among-us-option').on('click', () => {
        grid_container.empty()
        grid_container.append(initial_state)
        $('body').css({
            "background" : "url('./among_us_assets/among-us-background.jpg')",
            "background-size" : "cover"
        });
        $('#header').text('AMONG US').css({
            "color":"#ffffff",
            "font-family": "'Amatic SC', cursive",
            "font-size" : "3rem"
        });
        $('.initial-card').css("border", "1px solid white");
        $('audio').each(function(){
            this.pause(); // Stop playing
            this.currentTime = 0; // Reset time
        }); 
        $('body').append("\
        <audio id='bgm' controls autoplay loop> \
            <source src='./among_us_assets/Among_Us.mp3' type='audio/mpeg'> \
        </audio>");
        $('#player1').css('background-image', "url('./among_us_assets/red.PNG')")
        $('#player2').css('background-image', "url('./among_us_assets/orange.PNG')")
        $('.game-score').css({
            "color":"#ffffff",
            "font-family": "'Amatic SC', cursive",
            "font-size" : "1.5rem",
            "background" : "none",
        });
        $('.round-score').css({
            "color":"#ffffff",
            "font-family": "'Amatic SC', cursive",
            "font-size" : "1.5rem",
            "background" : "none",
        });
        $('.win-container').css({
            "color":"black",
            "font-family": "'Amatic SC', cursive",
            "font-size" : "3rem",
        })
        curr_asset = 'among_us_assets'
        //set back of card
        back_image = "url('./among_us_assets/among_us.PNG')"
        //enable start button once a theme has been selected
        $('.start-btn').removeAttr("disabled");
        selected_images = amongUsImages
        
    });

    $('#maplestory-option').on('click', () => {
        grid_container.empty()
        grid_container.append(initial_state)
        $('body').css({
            "background" : "url('./maplestory_assets/maplestory_background.PNG')",
            "background-size" : "cover"
        });
        $('#header').text('Maplestory').css({
            "color":"#ffffff",
            "font-family": "Maplestory",
            "font-size" : "3rem"
        });
        $('.initial-card').css("border", "1px solid black");
        $('audio').each(function(){
            this.pause(); // Stop playing
            this.currentTime = 0; // Reset time
        }); 
        $('body').append("\
        <audio id='bgm' controls autoplay loop> \
            <source src='./maplestory_assets/maplestory.mp3' type='audio/mpeg'> \
        </audio>");
        $('.game-score').css({
            "color":"black",
            "font-family": "Maplestory",
            "font-size" : "2rem",
            "background" : "rgba(255 ,255 ,255 ,0.5)",
        });
        $('.round-score').css({
            "color":"black",
            "font-family": "Maplestory",
            "font-size" : "2rem",
            "background" : "rgba(255 ,255 ,255 ,0.5)",
        });
        $('.win-container').css({
            "color":"black",
            "font-family": "Maplestory",
            "font-size" : "3rem",
        })
        $('#player1').css('background-image', "url('./maplestory_assets/alpha.PNG')")
        $('#player2').css('background-image', "url('./maplestory_assets/beta.PNG')")
        back_image = "url('./maplestory_assets/maplestory_back.PNG')"
        curr_asset = 'maplestory_assets'
        selected_images = maplestory_images
        $('.start-btn').removeAttr("disabled");
    })
}

const continueListener = () => {
    $('#play-again').on('click', () => {
        $('.win-container').hide();
        grid_container.empty();
        grid_container.append(initial_state);
    })
}


dropdownListener();
dropdownOptionsListners();
continueListener();


function main(){
    //disable button 
    $('.start-btn').attr("disabled","disabled");

    // reset
    clickedCard = null 
    clicked_id = null 
    canClick = false 
    matched = 0
    p1_score = 0
    p2_score = 0
    if( curr_player === 'player1'){
        curr_player = 'player2';
    } else {
        curr_player = 'player1';
    }
    $('#player1').css('box-shadow', 'none')
    $('#player2').css('box-shadow', 'none')

    $('#player1-round-score').text(`${p1_score}`);
    $('#player2-round-score').text(`${p2_score}`);

    // shuffle
    let cards = shuffle(pickRandomImages(selected_images, 12));

    // Make grid
    grid_container.empty();
    for (let i=0; i < 24; i++){
        grid_container.append($(" \
        <div class='card "+cards[i]+"' id='"+i+"'> \
            <div class='flip-card-inner' id='inner-card-"+i+"'> \
                <div class='flip-card-front' id='front-"+i+"'></div> \
                <div class='flip-card-back' id='back-"+i+"'></div> \
            </div> \
        </div>"
        ))
        // add front image
        $('#front-'+i).css('background-image', "url('./"+curr_asset+"/"+cards[i]+".PNG')")
        // add back image
        $('#back-'+i).css('background-image', back_image)
    }

    // hide cards after some time
    for (let i=0; i < cards.length; i++){
        setTimeout(function(){
            $('#inner-card-'+i).toggleClass('flipped')
            canClick = true
            // re-enable button
            $('.start-btn').removeAttr("disabled");
        }, 2000)
    }

    // highlight curr_player turn
    $('#'+curr_player).css('box-shadow', '-1px 1px 5px 4px red')

    // add click listener for each card
    cardListener(cards)

}

function cardListener(cards){
    grid_container.find('.card').bind('click', function(){
        console.log('p1:', p1_score, ' p2:', p2_score)
        let card_id = $(this).attr('id')
        // card can be clicked if not already matched, not the same card, and currently not comparing two cards
        if (!($(this).hasClass('matched')) && canClick && card_id != clicked_id){
            // flip card to image
            $('#inner-card-'+card_id).toggleClass('flipped')

            // assign first card if it's the first card 
            if (clickedCard === null){
                clickedCard = $(this).attr('class')
                clicked_id = card_id
                // console.log('clickedcard:', clickedCard, clicked_id)
            }
            // else compare the two clicked cards
            else{
                canClick = false
                // if match keep on board 
                if ($(this).attr('class') === clickedCard){
                    $(this).addClass('matched');
                    $('#'+clicked_id).addClass('matched');
                    matched++
                    if (curr_player == 'player1'){ p1_score++ }
                    else { p2_score++ }
                    canClick = true
                    $('#player1-round-score').text(`${p1_score}`);
                    $('#player2-round-score').text(`${p2_score}`);
                }
                // if not a match, then flip them over, and change player's turn
                else{
                    setTimeout(function () {
                        $('#inner-card-'+card_id).toggleClass('flipped')
                        $('#inner-card-'+clicked_id).toggleClass('flipped')
                        if (curr_player === 'player1'){
                            $('#player1').css('box-shadow', 'none')
                            $('#player2').css('box-shadow', '-1px 1px 5px 4px red')
                            curr_player = 'player2'
                        }
                        else{
                            $('#player1').css('box-shadow', '-1px 1px 5px 4px red')
                            $('#player2').css('box-shadow', 'none')
                            curr_player = 'player1'
                        }
                        canClick = true
                    },1000)
                }
                clickedCard = null
            }
            
            // win 
            if (matched === cards.length/2){
                $('.win-container').css('display', 'flex')
                if (p1_score > p2_score){
                    $('#win-message').text("Player 1 Won!")
                    p1_game_score++
                    $('#player1-score').text(`${p1_game_score}`)
                }
                else if (p1_score < p2_score){
                    $('#win-message').text("Player 2 Won!")
                    p2_game_score++
                    $('#player2-score').text(`${p2_game_score}`)
                }
                else{
                    $('#win-message').text("It's a tie!")
                }
                canClick = false
            }
        }
    })
}

// close win message when click outside content 
window.onclick = function(event) {
    if (event.target.matches('.win-container')) {
        $('.win-container').css('display', 'none')        
    }
}


// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = $(".dropdown-content");
       /* if we have multiple dropdowns

      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        console.log(typeof(openDropdown));
        openDropdown.hide();
      }
      */

      dropdowns.hide();
    }
}