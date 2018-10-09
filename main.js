
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
            <div class="btn-group pull-right" role="group" aria-label="...">
              <button class='align-baseline btn btn-primary delete-box'><span class= 'glyphicon glyphicon-trash'></span> Delete </button>
              <button class='align-baseline btn btn-primary'>Unpacked!</button>
            </div>
            
            
            `

        document.getElementById('box-field').appendChild(newBox)
        document.getElementById('box-add').reset()
       // document.getElementById('box-name').scrollIntoView()
        
    })
//Deleting boxes
    document.addEventListener('click', function(event) {
      if (event.target.matches('.delete-box')) {
          let boxerString = '' + event.target.parentNode.textContent;
          let boxInd = Number(boxerString.charAt(27))
          alert(`Great! Possessions unlocked: ${allBoxes[boxInd - 1].items}!`)
          console.log(allBoxes[boxInd - 1])
          event.target.parentNode.remove()
      }

    })
// Search
    let searchBtn = document.getElementById('search-btn')  
    let alertBar = document.getElementById('alert-bar')
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let searchTerm = document.getElementById('search-box').value
      if (allBoxes.length === 0) {
        alertBar.innerHTML = `You can't search, you haven't packed anything!<button id="search-null">Oh yeah lol</button>`
        alertBar.classList.remove('alert-success')
        alertBar.classList.add('alert-danger')
        alertBar.classList.remove('hidden')
        let okBtnBad = document.getElementById('search-null')
        okBtnBad.addEventListener('click', function() {
            alertBar.classList.add('hidden')
            document.getElementById('search-box').value = ''
        })
           
      }
      let foundArray = [];
      for (let box of allBoxes) {
          for (let boxItem of box.items) {
            if (boxItem.toUpperCase() === searchTerm.toUpperCase()) {
                foundArray.push(`#${box.number} - ${box.name}`)      
            }          
           }//for
       }//for
       if (foundArray.length > 0) {
            alertBar.innerHTML=`Success--${searchTerm} found in: ${foundArray.join(', ')}.  <button id='search-good'>Nice, thanks!</button>`
            alertBar.classList.remove('alert-danger')
            alertBar.classList.add('alert-success')
            alertBar.classList.remove('hidden')

            let okBtnGood = document.getElementById('search-good')
            okBtnGood.addEventListener('click', function() {
              alertBar.classList.add('hidden')
              document.getElementById('search-box').value = ''
            })
       } else {
                alertBar.innerHTML = `Sorry, you don't have one of those! <button id='search-bad'>Oh, bummer.</button>`
                if (!searchTerm) { alertBar.innerHTML = `Enter an item first! <button id='search-bad'>right, right</button>` }
                alertBar.classList.remove('alert-success')
                alertBar.classList.add('alert-danger')
                alertBar.classList.remove('hidden')
                let okBtnBad = document.getElementById('search-bad')

                okBtnBad.addEventListener('click', function() {
                    alertBar.classList.add('hidden')
                    document.getElementById('search-box').value = ''
                })
       }//else
              
   

    }) //search btn event
  





















})
