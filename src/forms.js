const handleFillCountry = _.debounce((ev) => {
    // only show matched events

    const node = ev.target.parentNode.getElementsByClassName('search-box')[0]
    node.style.display = 'initial'
    node.innerHTML = ''

    let inputText = ev.target.value.toLowerCase()
    console.log(`search for ${inputText}`);

    for (let country of countryList) {
        let row = document.createElement('div')
        row.innerText = country
        row.onclick = selectCountry

        node.appendChild(row)
    }
}, 300);

//Referencias

function validateName(event) {
    const name = event.target.value

    console.log('validate name: ' + name);
    console.log(' la longitud del nombre es:' + name.length)

    // const nameValue = inputName.value.trim();

    if (!name || name.length < 8) {

        showElementWithClassName(event.target, 'invalid-feedback')
    }
    else {

        hideElementWithClassName(event.target, 'valid-feedback')
   
    }

    return false

}



function validatePassword(event) {
    // password should be at least 8 of length
    // should contains at least one lower letter
    // should contains at least one capital letter
    // should contains at least one number
    // otherwise, password is invalid
    const password = event.target.value

    const arrayMayus = ["ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"];

    const arrayMins = ["abcdefjhijklmnñoprstuvwxyz"];

    const arrayNums = ["1234567890"];

    let hasCapital = false ;
    let hasLower = false ;
    let hasNum = false ;


    for (let index = 0; index < arrayMins.length; index++) {
        
        for (let indexj = 0; indexj < password.length; indexj++) {
            
            if(arrayMins[index] = password[indexj]){
                hasLower = true
            }
            
        }
    }

    for (let index = 0; index < arrayMayus.length; index++) {
        
        for (let indexj = 0; indexj < password.length; indexj++) {
            
            if(arrayMayus[index] = password[indexj]){
                hasCapital = true
            }
            
        }
    }

  
    for (let index = 0; index < arrayNums.length; index++) {
        
        for (let indexj = 0; indexj < password.length; indexj++) {
            
            if(arrayNums[index] = password[indexj]){
                hasNum = true
            }
            
        }
    }

    if(  !password || password.length < 8 || !hasCapital || !hasLower || !hasNum){
        showElementWithClassName(event.target, 'invalid-feedback')
    }

    else{
        hideElementWithClassName(event.target, 'valid-feedback')
    }


    return false
}

function validateEmail(event) {
    const email = event.target.value
    let position = 0;
    let hasArroba = false;
    let hascontentBefore = false;
    let hascontentAfter = false;
    let isEmail =false;
    for (let index = 0; index < email.length; index++) {
        if(email[index] == '@'){
            console.log('has @')
            hasArroba = true
            position = index;
        }
        
    }

    const content = " ";

    if(hasArroba){


        for (let index = 0; index < position; index++) {
            if( !(email[index]) == content){
                hascontentBefore = true
            }
            
        }

        for (let index = position+1; index < email.length; index++) {
            if( !(email[index]) == content){
                hascontentAfter = true
            }
            
        }
    }

    if(hascontentAfter && hascontentBefore){
        isEmail = true 
    }

    if(!isEmail){
        showElementWithClassName(event.target, 'invalid-feedback')
    }
    else{
        
        hideElementWithClassName(event.target, 'valid-feedback')

    }
    
    return false
}


// general register
function register(event) {
    // check if name is fullfiled
    // check if email is fullfiled
    // check if password is fullfiled
    // check if gender is selected
    // check if checkbox with "I confirm that all data are correct" is checked


    // then, send a POST to localhost:3000/register with all the data in the body as a JSON
    fetch('http://localhost:3000/', {
        method: 'POST',
        body: JSON.stringify({
            'name': 'sample'
        }),
        headers: {
            'Content-type': 'application/json'
        },
    })
    event.preventDefault();
    return false;
}

// utility functions
function showElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'initial'
}
function hideElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'none'
}
function selectCountry(event) {
    console.log(event);
    document.forms[0].country.value = event.target.innerText

    const node = document.getElementsByClassName('search-box')[0]
    node.style.display = 'none'
    node.innerHTML = ''
}

function init() {
    let items = document.getElementsByClassName('valid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }
    items = document.getElementsByClassName('invalid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }

    document.getElementsByClassName('search-box')[0].style.display = 'none'
}

init()