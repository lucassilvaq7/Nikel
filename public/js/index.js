const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Email or password used was wrong please try again.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Email or password used is wrong please try again.");
            return;
        }
    
        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

// CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    
    if(email.length <10) {
        alert("Please fill the field with a valid email.");
        return;
    }
    if(password.length <4) {
        alert("Create a password with at least 4 characteres.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert("Account created sucessfully.")
});

function checkLogged () {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
            saveSession(logged, session);
            
            window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    
    if(account) {
        return JSON.parse(account);
    }

    return "";
}