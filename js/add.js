$(document).ready(function() {
    var person_id = 0;
    $("#new-person-form input").addClass("requiered-input");
    $.post("data_query.php", {type: "get_persons"}, function(data) {
        $(data).each(function (i, val) {
            var name = val.first_name + " " + val.last_name;
            $("#persons").append("<option id=" + val.id + ">" + name + "</option>");
        });
    }, "json");
    $("#persons").change(function() {
        if ($(this).val() == "<<New Person>>") {
            $("#new-person-form").show();
            person_id = 0;
            $("#new-person-form input").addClass("requiered-input");
        } else {
            $("#new-person-form input").removeClass("requiered-input");
            $("#new-person-form").hide();
            person_id = $("#persons :selected").attr("id");
        }
    });
    $("#save-device-button").click(function(e) {
        var all_fields_filling = true;
        $(".requiered-input").each(function() {
            if($(this).val() == "" ) {
                all_fields_filling = false;
                $(this).css("background", "#F9A7B0");
            } else $(this).css("background", "#FFFFFF");
        });
        if (all_fields_filling) { 
            if (person_id == "0") {
                $.post("data_query.php", "type=add_device&" + $("#new-device-form").serialize() + "&" + $("#new-person-form").serialize(),
                function(data){
                        document.location = "index.html";
                });
            } else {
                $.post("data_query.php", "type=add_device&" + $("#new-device-form").serialize() + "&person_id=" + person_id,
                    function(data){
                        document.location = "index.html";
                    });
            }
        } else alert("fill all mandatory fields");
    });
});