$(document).ready(function() {
    var person_id = 0;
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
        } else {
            $("#new-person-form").hide();
            person_id = $("#persons :selected").attr("id");
        }
    });
    $("#save-device-and-person").click(function(e) {
        if (person_id == "0") {
            $.post("data_query.php", "type=add_device&" + $("#device-form").serialize() + "&" + $("#new-person-form").serialize());
        } else {
            $.post("data_query.php", "type=add_device&" + $("#device-form").serialize() + "&person_id=" + person_id);
        }
    });
});