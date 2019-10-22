function getrandomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getdigitproduct(number) {
    let prod = 1;
    let numstr = number.toString();
    for (let i = 0; i < numstr.length; i++) {
        prod = prod * parseInt(numstr[i]);
    }
    return prod;
}

function getrandomdigit(number) {
    let numstr = number.toString();
    let digitindex = Math.floor(Math.random() * numstr.length);
    return numstr[digitindex];
}

$(document).ready(function () {
    $('#tsfd').hide();

    let diff = $('input[name=radio]:checked').val();
    let rand = getrandomnumber(1, diff);

    let hintpanel = $('#hintpanel');

    let input = $('#gno');
    let guessbtn = $('#gbtn');

    let cbox = $('.switch input');
    cbox.prop("checked", true);
    let ischecked = true;
    let toohigh = false, toolow = false;
    let diffbox = $('input[name=radio]:radio');
    $('input[name=radio][value=100]').prop("checked", true);
    let max = $('#max');

    input.on('keyup', function (event) {
        if (event.keyCode === 13) {
            guessbtn.click();
        }
    });

    cbox.change(function () {
        ischecked = cbox.is(":checked");
        if (!ischecked) {
            hintpanel.css("background-color", "black");
            $('#tsfd').show();
        }
        else {
            hintpanel.css("background-color", "white");
            $('#tsfd').hide();
        }
    });

    diffbox.change(function () {
        diff = $('input[name=radio]:checked').val();
        rand = getrandomnumber(1, diff);

        //hide hints checkbox in Easy level
        if (diff == 10) {
            if (ischecked) {
                cbox.click();
            }
            $('.hbox').hide();
        }
        else {
            if (!ischecked) {
                cbox.click();
            }
            $('.hbox').show();
        }

        max.html(diff);
    });

    let end = false;
    let nog = 10;
    let count = 0;
    (guessbtn).click(function () {
        let gval = input.val();

        if (String(gval) != '' && count < 10 && !end) {
            $('.hbox').hide();
            $('#diffchoose').hide();
            count++;

            if (gval < rand) {
                toohigh = false;
                toolow = true;
                end = false;
            }
            else if (gval > rand) {
                toolow = false;
                toohigh = true;
                end = false;
            }
            else {
                $("#myModal").modal();
                end = true;
            }
            let msg = '';
            if (toohigh && !end) {
                msg = 'Too High';
            }
            else if (toolow && !end) {
                msg = 'Too Low';
            }
            else {
                msg = 'Correct';
            }

            let div2 = "The number is " + ((rand % 2 == 0) ? "even." : "odd.");
            let div3 = "Sum of the digits is" + ((rand % 3 == 0) ? " " : " not ") + "divisible by 3";
            let div5 = "The number is " + ((rand % 5 == 0) ? " " : " not ") + "divisible by 5";
            let product = "Product of the digits is " + getdigitproduct(rand) + ".";
            let condigit = getrandomdigit(rand) + " is one of the digits of the number.";

            if (count == 10) {
                $('#lost_msg').text('The number was ' + rand);
                $("#myModal2").modal();
            }
            $('.gcontent').append('<h4>' + gval + '(' + msg + ')' + '<h4>');
            if (ischecked) {
                switch (nog) {
                    case 10:
                        $('.hcontent').append('<h4>' + div2 + '<h4>');
                        break;
                    case 8:
                        $('.hcontent').append('<h4>' + product + '<h4>');
                        break;
                    case 6:
                        $('.hcontent').append('<h4>' + div3 + '<h4>');
                        break;
                    case 4:
                        $('.hcontent').append('<h4>' + div5 + '<h4>');
                        break;
                    case 2:
                        $('.hcontent').append('<h4>' + condigit + '<h4>');
                        break;
                }
            }
            nog--;
            $('#guesses').text(count);
        }

        input.val(null);
    });

    $('#resetbtn').click(function () {
        //Refresh Page rather than manual refresh due to some issues 
        location.reload();
    });

    $('#clw').click(function () {
        $('#resetbtn').click();
    });
    $('#cll').click(function () {
        $('#resetbtn').click();
    });

});
