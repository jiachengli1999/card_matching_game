let grid_container = $('.grid-container')
let images = ['astrologian', 'bard', 'black_mage', 'blue_mage', 'dancer', 
                'dark_knight', 'Dragoon', 'gun', 'gunbreaker', 'monk', 'ninja', 
                'paladin']
let background = 'none'
let clickedCard = null 
let clicked_id = null 
let canClick = false 
let matched = 0

// shuffle referenced from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    // dup values in array to get two of the same card in array
    let res = array.slice()
    for (let i=0; i < images.length; i++){
        res.push(images[i])
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
    
    return res;
}

function main(){
    // reset
    clickedCard = null 
    clickded_id = null 
    canClick = false 
    matched = 0

    // shuffle
    let cards = shuffle(images)
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
        }, 2000)
    }

    // add click listener for each card
    cardListener(cards)
}

function cardListener(cards){
    grid_container.find('.card').bind('click', function(){
        // get card id
        let card_id = $(this).attr('id')
        // card can be clicked if not already matched, not the same card, and currently not comparing two cards
        console.log($(this).attr('class'))
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
                    console.log('matched')
                    $(this).addClass('matched');
                    $('#'+clicked_id).addClass('matched');
                    matched++;
                    canClick = true
                }
                // if not a match, then flip them over
                else{
                    setTimeout(function () {
                        $('#inner-card-'+card_id).toggleClass('flipped')
                        $('#inner-card-'+clicked_id).toggleClass('flipped')
                        canClick = true
                    },1000)
                }
                clickedCard = null
            }
            
            // win 
            if (matched === cards.length/2){
                console.log('win')
                canClick = false
            }
        }
    })
}