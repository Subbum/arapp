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
        var statements = userplane.querySelector('#statement');
        var count = -1;
        name.setAttribute('text', `value: Name: ${data.name}`);
        cno.setAttribute('text', `value: Card Number: ${data.cno}`);
        ano.setAttribute('text', `value: Account Number: ${data.ano}`);
        data.transactions.forEach(statement => {
            statements.innerHTML += `<a-entity scale="1 1 1" text="value: ${statement}" position="0 0 ${count/2}"></a-entity>`
            count++;
        })
    });
})