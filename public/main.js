let unicorns = [];

const render = function () {
    let source = $('#unicorns-template').html();
    let template = Handlebars.compile(source);
    let newHTML = template({ unicorns: unicorns })
    $('.unicorns').append(newHTML);
}

const gettingUniList = function () {
    $.get('/unicorns').then((data) => {
        unicorns = data;
        $('.unicorns').empty();
    }).then(() => {
        render();
        unicorns = [];
    })
}

gettingUniList();

$('.add').on('click', function () {
    let name = $('.name').val();
    let magic = $('.magic').val();

    if (magic == '' || name == '') { // VALIDATION
        if(name == '' && magic== ''){
            $('.nameError').css('visibility', 'visible');
            $('.magicError').css('visibility', 'visible');
        }
        if (magic != '' && name == '') {
            $('.nameError').css('visibility', 'visible');
        }
        if (name != '' && magic == '') {
            $('.magicError').css('visibility', 'visible');
        }
    }

    else {
        $('.magicError').css('visibility', 'hidden');
        $('.nameError').css('visibility', 'hidden');
        name = $('.name').val();
        magic = $('.magic').val();
        let unicorn = {
            name: name,
            magic: magic
        }
        $.post('/unicorns', unicorn).then(() => {
            gettingUniList();
        })
        $('.name').val('');
        $('.magic').val('');
    }

})

$('.containerAll').on('click','.delete', function(){
    let id = $(this).closest('.unicorn').find('.line').data("id");
    $.ajax({
        method: 'DELETE',
        url: '/unicorns/' + id
    }).then(()=>{
        gettingUniList();
    })
})