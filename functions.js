



function createBox(boxObject) {
    let newBox=document.createElement('DIV')
    newBox.classList = 'boxy col-md-5'
    newBox.id = boxObject.number
    newBox.innerHTML = 
        `<p class='align-middle'>
        <span class='box-header'>
        #${boxObject.number} |
        ${boxObject.name}</span><br>
        <i>In this box:</i><br>${boxObject.items.join(', ')}
        </p>
        <div class="btn-group pull-right" role="group" aria-label="...">
        <button class='btn btn-primary delete-box'><span class= 'glyphicon glyphicon-trash'></span> Delete </button>
        <button class='btn btn-primary'>Unpacked!</button>
        </div>`
    document.getElementById('box-field').prepend(newBox)
    document.getElementById('box-add').reset()
    
}

function renderBoxField(boxArr) {
    for (let i of boxArr) {
       createBox(i)
     }
}


module.exports = { createBox, renderBoxField }