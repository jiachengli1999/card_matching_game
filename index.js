let grid_container = $('.grid-container')
let images = ['astrologian', 'bard', 'black_mage', 'blue_mage', 'dancer', 
                'dark_knight', 'Dragoon', 'gun', 'gunbreaker', 'monk', 'ninja', 
                'paladin']
let background = 'none'
let clickedCard = null 
let cardid = null 
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
    cardid = null 
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
        grid_container.append($("<div class='card "+cards[i]+"' id='card-"+i+"'></div>"))
        $('#card-'+i).css('background-image', "url('./among_us_assets/"+cards[i]+".PNG')")
    }

    // hide cards after some time
    for (let i=0; i < cards.length; i++){
        setTimeout(function(){
            $('#card-'+i).css('background-image', background)
            canClick = true
        }, 2000)
    }

    // add click listener for each card
    cardListener(cards)
}

function cardListener(cards){
    grid_container.find('.card').bind('click', function(){
        // card can be clicked if not already matched, not the same card, and currently not comparing two cards
        if (!($(this).hasClass('matched')) && canClick && $(this).attr('id') != cardid){
            // get image name
            let card_name = $(this).attr('class').split(/\s+/)[1]
            // assign image to clicked card
            $(this).css('background-image', "url('./among_us_assets/"+card_name+".PNG')")
            $(this).addClass('open')

            // assign first card if it's the first card 
            if (clickedCard === null){
                clickedCard = $(this).attr('class')
                cardid = $(this).attr('id')
                // console.log('clickedcard:', clickedCard, cardid)
            }
            // else compare the two clicked cards
            else{
                canClick = false
                // if match keep on board 
                if ($(this).attr('class') === clickedCard){
                    grid_container.find('.open').addClass('matched');
                    grid_container.find('.matched').removeClass('open');
                    matched++;
                    // console.log('matched')
                    canClick = true
                }
                // if not a match, then flip over 
                else{
                    setTimeout(function () {
                        grid_container.find('.open').css('background-image', background)
                        grid_container.find('.open').removeClass('open'); 
                        canClick = true
                    },1000)
                }
                clickedCard = null
            }
            
            // win 
            if (matched === cards.length/2){
                console.log('win')
            }
        }
    })
}