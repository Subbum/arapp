$(document).ready(function(){
    $('.open').click(function(){
        alert('hello')
        $('.menuselector').css({'display':'flex'}, function(){
            $('.menuselector').css({'width':'100%'})
        })
    })
})