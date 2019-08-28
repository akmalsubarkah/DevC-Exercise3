var data = [];

function getData(key, value) {
    dataResult = []
    dataResult.push("<tr>");
    dataResult.push("<td id='"+ key +"'>"+ ((key+1)) +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.name +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.rotation_period +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.orbital_period +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.diameter +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.climate +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.gravity +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.terrain +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.surface_water +"</td>");
    dataResult.push("<td id='"+ key +"'>"+ value.population +"</td>");
    dataResult.push("</tr>")

    return dataResult;
}

function loadData() {
    limit = $('#filter').val();
    var items = [];
    $("#data tr").remove();
    $.each(data, function(key, value){
        switch (limit) {
            case '0':
                items.push(getData(key, value));
            break;
            case '1':
                if(value.rotation_period > 23){
                    items.push(getData(key, value));
                }
            break;
            case '2':
                if(value.rotation_period <= 23){
                    items.push(getData(key, value));
                }
            break;
            case '3':
                if(value.orbital_period > 500){
                    items.push(getData(key, value));
                }
            break;
            case '4':
                if(value.orbital_period <= 500){
                    items.push(getData(key, value));
                }
            break;
            case '5':
                if(value.diameter > 10000){
                    items.push(getData(key, value));
                }
            break;
            default:
                if(value.diameter <= 10000){
                    items.push(getData(key, value));
                }
            break;
        }
    });
    
    $(items.join("")).appendTo("#data");
}

function loadJSON() {
    var dataJSON = (function(){
        var dt = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'https://swapi.co/api/planets/?format=json',
            'dataType': "json",
            'success': function (data) {
                dt = data;
            }
        });
        return dt;
    })();
    return dataJSON;
}

$(document).ready(function(){
    data = loadJSON().results;
    loadData();
});

$("#filter").change(function(){
    loadData();
});
