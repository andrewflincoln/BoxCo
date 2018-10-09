
const allBoxes = [];

document.addEventListener('DOMContentLoaded', function() {

    
    let createBox = document.getElementById('box-create')
    let emptyMsg = document.getElementById('empty-msg')

    //Creating boxes
    createBox.addEventListener('click', function(e) {
       
        emptyMsg.remove();
        let newBoxObj = {};
        newBoxObj['items'] = [];
        newBoxObj['number'] = allBoxes.length + 1;
        newBoxObj['name'] = document.getElementById('box-name').value
        
        for (let i = 1; i < 11; i++) {
            if (document.getElementById('item' + i).value) {
                newBoxObj.items.push(document.getElementById('item' + i).value)
            }
        }    
     

        allBoxes.push(newBoxObj)
        let newBox=document.createElement('DIV')
        newBox.classList = 'boxy col-md-5'
        newBox.innerHTML = 
            `<p class='align-middle'>
            <span class='box-header'>
            #${newBoxObj.number} |
             ${newBoxObj.name}</span><br>
            <i>In this box:</i> ${newBoxObj.items.join(', ')}
            </p>
            <button class='align-baseline delete-box btn btn-primary'>Delete this box</button>
            
            
            `

        document.getElementById('box-field').appendChild(newBox)
        document.getElementById('box-add').reset()
        document.getElementById('box-name').focus()
        
    })

    document.addEventListener('click', function(event) {
      if (event.target.matches('.delete-box')) {
          let boxerString = '' + event.target.parentNode.textContent;
          let boxInd = Number(boxerString.charAt(27))
          alert(`Great! Possessions unlocked: ${allBoxes[boxInd - 1].items}!`)
          console.log(allBoxes[boxInd - 1])
         
      
          event.target.parentNode.remove()
      }

    })





















})
