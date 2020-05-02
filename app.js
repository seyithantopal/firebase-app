createList = (doc) => {
    const list = document.querySelector('.users-list');
    const li = document.createElement('li');

    content = document.createElement('span');
    content.innerHTML = "<b>Document ID: </b>" + doc.id + "<br /><b>Email: </b>" + doc.data().email + '<br><b>Username: </b>' + doc.data().username + '<br><b>Password: </b>' + doc.data().password;
    
    li.appendChild(content);
    list.appendChild(li);
}

checkEmail = async (newUser) => {
    let isEqual = false;
    await db.collection('users').get().then((snapshot) => {
        snapshot.docs.map((doc, i) => {
            if(doc.data().email === newUser.email) isEqual = true;
        });
    });
    return isEqual;
}

checkPassword = (newUser) => {
    if(newUser.password.length < 6) return false;
    else return true;
}

// Get all the data
db.collection('users').get().then((snapshot) => {
    snapshot.docs.map((doc, i) => {
        createList(doc);
    });
});

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newUser = {
        email: form.email.value,
        username: form.username.value,
        password: form.password.value
    };
    
    checkEmail(newUser).then((result) => {
        if(result === true) {
            console.log('This email exists in the database');
        } else {
            if(checkPassword(newUser)) {
                db.collection('users').add(newUser);
                console.log('Added!');
                console.log(newUser);
                document.querySelector(".form").reset();
            } else {
                console.log('Password must be at least 6 characters');
            }
        }
    });
    
});