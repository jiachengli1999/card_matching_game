let grid_container = $('.grid-container')
let amongUsImages = ['astrologian', 'bard', 'black_mage', 'blue_mage', 'dancer', 
                'dark_knight', 'Dragoon', 'gun', 'gunbreaker', 'monk', 'ninja', 
                'paladin', 'red_mage', 'samurai', 'scholar', 'summoner', 
                'warrior', 'white_mage']
let background = 'none'
let clickedCard = null 
let clicked_id = null 
let canClick = false 
let matched = 0
let themeSelected = false
let p1_score = 0
let p2_score = 0
let p1_game_score = 0
let p2_game_score = 0
let curr_player = 'player1'


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
        $('body').append("\
        <audio id='bgm' controls autoplay loop> \
            <source src='./among_us_assets/Among_Us.mp3' type='audio/mpeg'> \
        </audio>");
        $('.player1').css('background-image', "url('./among_us_assets/red.PNG')")
        $('.player2').css('background-image', "url('./among_us_assets/orange.PNG')")
        $('.score-container').css({
            "color":"#ffffff",
            "font-family": "'Amatic SC', cursive",
            "font-size" : "3rem",
        });
        $('.win-container').css({
            "color":"black",
            "font-family": "'Amatic SC', cursive",
            "font-size" : "3rem",
        })
        //enable start button once a theme has been selected
        $('.start-btn').removeAttr("disabled");
    });
}


dropdownListener();
dropdownOptionsListners();

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
    curr_player = 'player1'

    // shuffle
    let cards = shuffle(pickRandomImages(amongUsImages, 12));
    //set back of card
    background = "url('./among_us_assets/among_us.PNG')"

    // Make grid
    grid_container.empty();
    for (let i=0; i < 24; i++){
        // style=\"background-image: url('./among_us_assets/"+cards[i]+".PNG');\"
        grid_container.append($(" \
        <div class='card "+cards[i]+"' id='"+i+"'> \
            <div class='flip-card-inner' id='inner-card-"+i+"'> \
                <div class='flip-card-front' id='front-"+i+"'></div> \
                <div class='flip-card-back' id='back-"+i+"'></div> \
            </div> \
        </div>"
        ))
        // add front image
        $('#front-'+i).css('background-image', "url('./among_us_assets/"+cards[i]+".PNG')")
        // add back image
        $('#back-'+i).css('background-image', "url('./among_us_assets/among_us.PNG')")
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
    $('.player1').css('border', '1px solid white')

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
                }
                // if not a match, then flip them over, and change player's turn
                else{
                    setTimeout(function () {
                        $('#inner-card-'+card_id).toggleClass('flipped')
                        $('#inner-card-'+clicked_id).toggleClass('flipped')
                        if (curr_player === 'player1'){
                            $('.player1').css('border', '0px')
                            $('.player2').css('border', '1px solid pink')
                            curr_player = 'player2'
                        }
                        else{
                            $('.player1').css('border', '1px solid pink')
                            $('.player2').css('border', '0px')
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
                    $('.win-container').html("\
                    <div class='win-content'> \
                        Player1 Won! \
                    </div>")
                    p1_game_score++
                    $('.player1-score').html('<div class="player1-score">'+p1_game_score+'</div>')
                }
                else if (p1_score < p2_score){
                    $('.win-container').html("\
                    <div class='win-content'> \
                        Player2 Won! \
                    </div>")
                    p2_game_score++
                    $('.player2-score').html('<div class="player2-score">'+p2_game_score+'</div>')
                }
                else{
                    $('.win-container').html("\
                    <div class='win-content'> \
                        It's a tie! \
                    </div>")
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