$(document).ready(function(){
    var sceneEl = document.querySelector('a-scene');
    var userplane = sceneEl.querySelector('#userplane');
    var loaderplane = sceneEl.querySelector('#loaderplane');
    $.get("/card/details?cno=1234567890", function(data, status){
        userplane.setAttribute('visible', true);
        loaderplane.setAttribute('visible', false);
        var name = userplane.querySelector('#name');
        var cno = userplane.querySelector('#cno');
        var ano = userplane.querySelector('#ano');
        var statement = userplane.querySelector('#statement');
        name.setAttribute('text', `value: ${data.name}`);
        cno.setAttribute('text', `value: ${data.cno}`);
        ano.setAttribute('text', `value: ${data.ano}`);
        statement.setAttribute('text', `value: ${data.transactions}`)
    });
})