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
            location = val.location;
            person = val.title + " " + val.first_name + " " + val.last_name;
            delete_icon = $('<input type="image" src="img/delete.png" width="24" height="24" id="delete-device-icon">')
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
            if (log_in) delete_icon.show();
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
}

function log_in(username) {
    $("#add_button").show();
    login = true;
    user = username;
    $("#login_button").attr("src", "img/logout.png")
                      .attr("title", "Log Out");
}

function log_out() {
    $.post("data_query.php", {type: "log_out"});
    $("#add_button").hide();
    login = false;
    $(this).attr("src", "img/login.png")
           .attr("title", "Log Out");        
}

$(document).ready(function() {
    $.post("data_query.php", {type: "checklogin"}, function(data) {
        if (data != '0') {
            log_in(data);
        }
    });
    $("#search_button").click(function() {
        var device_data = $("#input_string").val();
	    $.post("data_query.php", {type: "device_search", device_data: device_data}, function (data) {
            show_search_results(data);
	    }, "json");
   });
   $('#input_string').keyup(function(e) {
        if(e.keyCode == 13) {
            var device_data = $("#input_string").val();
            $.post("data_query.php", {type: "device_search", device_data: device_data}, function (data) {
                show_search_results(data);
            }, "json");
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
                $('#login-form').append($("<h4>Wrong name or password</h4>").css("color", "red"));
            }
        });
    });
    $("#add_button").click(function (e) {
        e.preventDefault();
        //$("#new-device-form").modal();
        document.location = "add.php";
    });
    $("#add-device-button").click(function (e) {
        var device_name = $("#device-name").val(),
            device_description = $("#device-description").val();
	    $.post("data_query.php", {type: "add_device", name: device_name, description: device_description}, function (data) {
            alert(data);
	    });
    });
});


