
function createBox(boxObject) {
    let newBox=document.createElement('DIV')
    newBox.classList = 'boxy col-md-5'
    newBox.id = boxObject.number
    newBox.innerHTML = 
        `<span class='box-header'>
        #${boxObject.number}  - 
        ${boxObject.name}</span><br><p><i>In this box:  </i> 
        ${boxObject.items.join(', ')}</p>
        
        <div class="btn-group pull-right" role="group" aria-label="...">
        <button class='btn btn-primary first-delete-box'><span class= 'glyphicon glyphicon-trash'></span> Delete </button>
        <button class='btn btn-primary unpacked-box' data-toggle="modal" data-target="#unpackModal">Unpacked</button>
        </div>`
    document.getElementById('box-field').prepend(newBox)
    document.getElementById('box-add').reset()
    document.getElementById('box-name').focus();
}

function renderBoxField(boxArr) {
    for (let i of boxArr) {
       createBox(i)
     }
}

document.addEventListener('DOMContentLoaded', function() {
      
    let allBoxes = JSON.parse(localStorage.getItem('allBoxes')) || []
    let unpackedBoxes = JSON.parse(localStorage.getItem('unpackedBoxes')) || []
    let packedBoxes = JSON.parse(localStorage.getItem('packedBoxes')) || []
    
    let addBoxBtn = document.getElementById('box-create')
    let emptyMsg = document.getElementById('empty-msg')

    
    
    
     if (packedBoxes.length > 0) {
         emptyMsg.classList.add('hidden');
         renderBoxField(packedBoxes)
     } else {
         emptyMsg.classList.remove('hidden')
         unpackedBoxes = [];
         allBoxes = [];
     }
    //Creating boxes
    addBoxBtn.addEventListener('click', function(e) {
        let newBoxObj = {};
        newBoxObj['items'] = [];
        newBoxObj['number'] = allBoxes.length + 1;
        newBoxObj['name'] = document.getElementById('box-name').value
        for (let i = 1; i < 11; i++) {
            if (document.getElementById('item' + i).value) { //item + i = id of input box
                newBoxObj.items.push(document.getElementById('item' + i).value)
            }
        }    
        allBoxes.push(newBoxObj)
        packedBoxes.push(newBoxObj)
        localStorage.setItem('allBoxes', JSON.stringify(allBoxes))
        localStorage.setItem('packedBoxes', JSON.stringify(packedBoxes))
        emptyMsg.classList.add('hidden');
        createBox(newBoxObj)
    })
//Unpacking boxes
    

    document.addEventListener('click', function(event) {
      if (event.target.matches('.unpacked-box')) {
          let boxId = Number(event.target.parentNode.parentNode.id)
          let boxInd = boxId - 1
          unpackedBoxes.push(allBoxes[boxInd])
          for (let i = 0; i < packedBoxes.length; i++) {
            if (packedBoxes[i].number == boxId) {
                packedBoxes.splice(i, 1)
            }
          }
          document.getElementById('modal-unpack-update').innerHTML=`That's ${unpackedBoxes.length} down, ${packedBoxes.length} to go!<br><br>Added to Unpacked: ${allBoxes[boxInd].items.join(', ')}.`
          if (packedBoxes.length === 0) {
            document.getElementById('modal-unpack-update').innerHTML=`Whoa, that's it. You just unpacked the last of ${unpackedBoxes.length} boxes!`
          }

          localStorage.setItem('allBoxes', JSON.stringify(allBoxes))
          localStorage.setItem('unpackedBoxes', JSON.stringify(unpackedBoxes))
          localStorage.setItem('packedBoxes', JSON.stringify(packedBoxes))
          document.getElementById('modal-unpacked-list').innerHTML=JSON.stringify(unpackedBoxes[0].items)

          event.target.parentNode.parentNode.remove()
          if (packedBoxes.length === 0 && unpackedBoxes.length === 0) {
            emptyMsg.innerHTML='<p>You\'re all out of boxes. That\'s OK, they\'re widely available.</p>'
            emptyMsg.classList.remove('hidden')
          } else if (packedBoxes.length === 0 && unpackedBoxes.length > 0) {
            emptyMsg.innerHTML='<p>Congratulations, it looks like you\'re unpacked. <br><br>Enjoy living here for a while, see you next time!</p>'
            emptyMsg.classList.remove('hidden')
          }
       } 
///// Deleting Boxes
    else if (event.target.matches('.first-delete-box')) {
        let boxId = Number(event.target.parentNode.parentNode.id)
        let boxInd = boxId - 1
        for (let i = 0; i < packedBoxes.length; i++) {
          if (packedBoxes[i].number == boxId) {
              packedBoxes.splice(i, 1)
          }
        }
        localStorage.setItem('allBoxes', JSON.stringify(allBoxes))
        localStorage.setItem('unpackedBoxes', JSON.stringify(unpackedBoxes))
        localStorage.setItem('packedBoxes', JSON.stringify(packedBoxes))
        event.target.parentNode.parentNode.remove()
        if (packedBoxes.length === 0) {
          emptyMsg.innerHTML ='<p>Congratulations, it looks like you\'re unpacked. <br><br>Enjoy living here for a while, see you next time!</p>'
            emptyMsg.classList.remove('hidden')
        }
      }
    })

//Reset button
   let resetBtn = document.getElementById('reset-boxes') 
    resetBtn.addEventListener('click', function() {
        allBoxes = []
        unpackedBoxes = []
        packedBoxes = []
        localStorage.setItem('allBoxes', JSON.stringify(allBoxes))
        localStorage.setItem('unpackedBoxes', JSON.stringify(unpackedBoxes))
        localStorage.setItem('packedBoxes', JSON.stringify(packedBoxes))
        location.reload()
    })


    let seeUnpackedBtn = document.getElementById('see-unpacked-btn')
    seeUnpackedBtn.addEventListener('click', function() {
      let unpackedSoFar = [];
      for (let box of unpackedBoxes) {
          for (let boxItem of box.items) {
              unpackedSoFar.push(boxItem)
          }
      }
      document.getElementById('modal-unpacked-list').innerHTML=unpackedSoFar.join('<br>')
    })


// Search
    let searchBtn = document.getElementById('search-btn')  
    let alertBar = document.getElementById('alert-bar')
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let searchTerm = document.getElementById('search-box').value

      let foundArray = [];
      let foundUnpackedArray = [];
      for (let box of packedBoxes) {
          for (let boxItem of box.items) {
            if (boxItem.toUpperCase() === searchTerm.toUpperCase()) {
                foundArray.push(`Box #${box.number} - ${box.name}`)      
            }          
           }
       }
       for (let box of unpackedBoxes) {
           for (let boxItem of box.items) {
               if (boxItem.toUpperCase() === searchTerm.toUpperCase()) {
                   foundUnpackedArray.push(`Box #${box.number} - ${box.name}`)
               }
           }
       }
       if (foundArray.length > 0) {
            alertBar.innerHTML=`${searchTerm} can be found in: ${foundArray.join(', ')}.  <button type='button' class='btn btn-success btn-xs' id='search-good'>Nice, thanks!</button>`
            alertBar.classList = 'form-control alert-success'
            let okBtnGood = document.getElementById('search-good')
            okBtnGood.addEventListener('click', function(e) {
                e.preventDefault()
              alertBar.classList.add('hidden')
              document.getElementById('search-box').value = ''
            })

       } else if (foundArray.length === 0 && foundUnpackedArray.length > 0) {
            alertBar.innerHTML=`${searchTerm} is unpacked! You may remember it from: ${foundUnpackedArray.join(', ')}.  <button type='button' class='btn btn-warning btn-xs' id='search-un'>Nice, thanks!</button>`
            alertBar.classList = 'form-control alert-warning'
            let okBtnGood = document.getElementById('search-un')
            okBtnGood.addEventListener('click', function(e) {
                e.preventDefault()
              alertBar.classList.add('hidden')
              document.getElementById('search-box').value = ''
            })
       }
       else {
                alertBar.innerHTML = `Sorry, you don't have one of those! <button type='button' class='btn btn-danger btn-xs' id='search-bad'>Oh, bummer.</button>`
                if (!searchTerm) { alertBar.innerHTML = `Enter an item first! <button type='button' class='btn btn-danger btn-xs' id='search-bad'>right, right</button>` }
                alertBar.classList = 'form-control alert-danger'
                let okBtnBad = document.getElementById('search-bad')

                okBtnBad.addEventListener('click', function(e) {
                    e.preventDefault()
                    alertBar.classList.add('hidden')
                    document.getElementById('search-box').value = ''
                })
       }   
    })
  





















})
