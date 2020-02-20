$(document).ready(function() {
    $('#hamburger .item:nth-child(-n+3)').css('display','none'); 
    $('#myclass .menu a').removeClass('active');
    $('#myclass .menu a:first-child').addClass('active');
    $.get({
        url: 'bulletin',
        success: function(response){
            $('#myclass .segment').html(response)
            bulletin_js()
        },
    });

    $('#myclass .ui.dropdown').dropdown();

    // Use the left menu button to change the content of the right area
    $('#myclass .tabular.menu a').click(function(){
        var page_click
        $('#myclass .menu a').removeClass('active');
        // Get the page the user clicked on
        // Todo: Add ids to the items and select by ids
        switch($(this).children().attr("class").split(' ')[0]) {
            case 'tasks':
                page_click = 'bulletin'
                $('#myclass .menu a:first-child').addClass('active');
                break;
            case 'pencil':
                page_click = 'pretest'
                $('#myclass .menu a:nth-child(2)').addClass('active');
                break;
            case 'comments':
                page_click = 'discussion'
                $('#myclass .menu a:nth-child(3)').addClass('active');
                break
            case 'table':
                page_click = 'score'
                $('#myclass .menu a:nth-child(4)').addClass('active');
                break
            default:
                page_click = 'bulletin'
                $('#myclass .menu a:first-child').addClass('active');
                break
        }

        // Get the specified HTML code and run the corresponding js script.
        $.get({
            url: page_click,
            success: function(response){
                $('#myclass .segment').html(response)
                // JavaScript script must be run after HTML string is inserted.
                switch(page_click) {
                    case 'tasks':
                        bulletin_js()
                        break;
                    case 'pencil':
                        break;
                    case 'comments':
                        break
                    case 'table':
                        break
                    default:
                        bulletin_js()
                        break
                }
            },
        });
    });
});

function bulletin_js(){
    $('#bulletin .ui.list .item i').click(function(){
        $(this).toggleClass('circle outline');
        $(this).toggleClass('check circle');
    });
}