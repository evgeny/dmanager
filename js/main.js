var login = false;
var user = "";

function utf8_decode(str_data) {
    var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
    
    str_data += '';
    
    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if ((c1 > 191) && (c1 < 224)) {
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
 
    return tmp_arr.join('');
}

function show_search_results(data) {
    if (data.length === 0) {
        data = "<h3>no device found</h3>";
        $("#result_list").empty();
        $("#result_list").append(data);
        $("#ssb").show();
        $("#result_list").show();
    } else {
        $("#result_list").empty();
        $(data).each(function (i, val) {
            var name = val.name,
            description = val.description,
            location = val.location,
            id = val.id;
            person = val.title + " " + val.first_name + " " + val.last_name;
            delete_icon = $('<input type="image" width="24" height="24" class="delete-device-icon">')
                .attr("src", "img/delete.png")
                .attr("id", id)
                .css("display", "none");
            device_div = $("<div>")
                .attr("class", "device")
                .append(
                    $("<h3 id='device-name'>")
                    .html(name)
                )
                .append(delete_icon)
                .append(
                    $("<p>")
                    .html("<b>Description: </b>" +
                        utf8_decode(description) 
                    )
                );
                
            details_div = $("<div>")
                .attr("id", "device" + i)
                .append(
                    $("<p>")
                    .html("<b>Location: </b>" +
                        location
                    )
                )
                .append(
                    $("<p>")
                    .html("<b>Person in charge: </b>" +
                        person +
                        "<br>" +
                        val.address +
                        "<br>" +
                        "tel.: " + val.phone +
                        " " +
                        "e-mail: " + val.email
                    )
                );
             
            details_div.hide();
            if (login) delete_icon.show();
            else delete_icon.hide();
            switcher = $("<button>")
                .attr("class", "switcher")
                .click(function () {
                    $("#device"+ i).slideToggle("slow");
                })
                .html("more details...");
                
            result_item = $("<ul>")
            .attr("class", 'g')
            .append(device_div)
            .append(switcher)                                        
            .append(details_div);
            $("#result_list").append(result_item);
        });
        
    
        $("#result_list").show();
        $('#ssb').show();
    }
    $(".delete-device-icon").click(function (e) {
        var device_id = $(this).attr("id");
	    $.post("data_query.php", {type: "remove_device", id: device_id});
        search_device();
    });
}

function log_in(username) {
    $("#add_button").show();
    login = true;
    user = username;
    $("#welcome").text("Welcome, " + user);
    $("#welcome").show();
    $(".delete-device-icon").show();
    $("#login_button").attr("src", "img/logout.png")
                      .attr("title", "Log Out");
}

function log_out() {
    $.post("data_query.php", {type: "log_out"});
    $("#add_button").hide();
    login = false;
    $("#welcome").hide();
    $(".delete-device-icon").hide();
    $("#login_button").attr("src", "img/login.png")
           .attr("title", "Log Out");        
    if (document.title === "Add Device") {
        document.location = "index.html";
    }
}

function search_device() {
    var device_data = $("#input_string").val();
    $.post("data_query.php", {type: "device_search", device_data: device_data}, function (data) {
        show_search_results(data);
    }, "json");
}

$(document).ready(function() {
    $.post("data_query.php", {type: "checklogin"}, function(data) {
        if (data != '0') {
            log_in(data);
        }
    });
    $("#search_button").click(function() {
        search_device();
   });
   $('#input_string').keyup(function(e) {
        if(e.keyCode == 13) {
            search_device();
        }
    });
    $("#help_button").click(function (e) {
        e.preventDefault();
        $('#basic-modal-content').modal();
    });
    $("#login_button").click(function (e) {
        $("#result_list").empty();
        e.preventDefault();
        if (!login) {
            $('#login-form').modal();
        } else {
            log_out();
        }
    });
    $("#send_button").click(function (e) {
    var username = $("#username").val(),
        password = $("#password").val();
        $.post("checklogin.php", {type: "checklogin", username: username, password: password}, function(data) {
            if (data != 0) {
                log_in(data);
                $.modal.close();
            } else {
                $('#wrong_login').show();
            }
        });
    });
    $("#add_button").click(function (e) {
        e.preventDefault();
        document.location = "add.php";
    });
});


