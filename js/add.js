$(document).ready(function() {
    var person;
    $.post("data_query.php", {type: "get_persons"}, function(data) {
        $(data).each(function (i, val) {
            var name = val.first_name + " " + val.last_name;
            $("#persons").append("<option>"+name+"</option>");
        });
    }, "json");
    $("#persons").change(function() {
        if ($(this).val() == "<<New Person>>")
            $("#new-person-form").show();
        else $("#new-person-form").hide();
    });
});