function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function GetAyah() {
    return new Promise((resolve, reject) => {
    fetch('Quran.json')
        .then(res => res.json())
        .then(data => {
        let surah = getRandomInt(114);
        let length = data[surah].array.length;
        let Ayah = getRandomInt(length);
        let arabic = data[surah].array[Ayah].ar;
        let typ = data[surah].type;
            resolve([ arabic,typ ]); // Resolve the Promise with the fetched value
        })
        .catch(error => reject(error)); // Reject the Promise if there's an error
    });
}

function GetHadith() {
    return new Promise((resolve, reject) => {
    fetch('muslim.json')
        .then(res => res.json())
        .then(data => {
        let HadithNum = getRandomInt(5362);
        let Hadith = data[HadithNum].hadith;
            resolve(Hadith ); // Resolve the Promise with the fetched value
        })
        .catch(error => reject(error)); // Reject the Promise if there's an error
    });
}


const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const loginBtn = document.querySelector('.loginbtn');
const registerBtn = document.querySelector('.registerbtn');
const logoutBtn = document.querySelector('.btnLogout');
const getAyah = document.querySelector('.GetAyah');
const getHadith = document.querySelector('.GetHadith');
const textWrapper = document.querySelector('.textsWrapper');
const iconAppClose = document.querySelector('.icon-close-mainApp');
const content = document.querySelector('.content');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

iconAppClose.addEventListener('click', () => {
    textWrapper.classList.remove('showWrapper');
    getAyah.classList.add("showBtn");
    getHadith.classList.add("showBtn");
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    content.classList.add('hide');

});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

loginBtn.addEventListener('click', () => {
    var email = document.getElementById("loginEmail").value;
    var pass = document.getElementById("loginPass").value;
    if (email == "admin@gmail.com" && pass == "admin") {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        btnPopup.classList.add("hideLogin");
        logoutBtn.classList.add("showLogout");
        getAyah.classList.add("showBtn");
        getHadith.classList.add("showBtn");

    } else {
        alert("Wrong Email or Password :( ");
    }
});

logoutBtn.addEventListener('click', () => {
    btnPopup.classList.remove("hideLogin");
    logoutBtn.classList.remove("showLogout");
    getAyah.classList.remove("showBtn");
    getHadith.classList.remove("showBtn");
    textWrapper.classList.remove("showWrapper");
    content.classList.remove('hide');

});

registerBtn.addEventListener('click', () => {
    var username = document.getElementById("signupUsername").value;
    var email = document.getElementById("signupEmail").value;
    var pass = document.getElementById("signupPass").value;
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
    alert("Signup Successfully ♥ ");
});

getAyah.addEventListener('click', () => {
    textWrapper.classList.add("showWrapper");
    getAyah.classList.remove("showBtn");
    getHadith.classList.remove("showBtn");
    GetAyah()
    .then(result => {
        [ayah, type] = result;
        var text = document.getElementById("text");
        var typ = document.getElementById("type");
        text.innerHTML = ayah;
        typ.innerHTML = type;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


getHadith.addEventListener('click', () => {
    textWrapper.classList.add("showWrapper");
    getAyah.classList.remove("showBtn");
    getHadith.classList.remove("showBtn");
    GetHadith()
    .then(result => {
        Hadith= result;
        var text = document.getElementById("text");
        var typ = document.getElementById("type");
        text.innerHTML = Hadith;
        typ.innerHTML = "حديث";
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


