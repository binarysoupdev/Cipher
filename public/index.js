const cipherText = document.getElementById("cipher");
const plainText = document.getElementById("plain");
const keyInput = document.getElementById("key-input");
const keyField = document.getElementById("key-field");
const plainSegment = document.getElementById("plain-segment");
const arrowIcon = document.getElementById("arrow-icon");
const videoLink = document.getElementById("video-link");
const question = document.getElementById("question");
const myAnswer = document.getElementById("my-answer");
const hintInput = document.getElementById("hint-input");

document.addEventListener('DOMContentLoaded', function() {
    keyInput.focus()

    const params = new URL(window.location.href).searchParams;
    if (!params.has('v')) return;

    const video = params.get('v');
    if (!video in ciphers) return;
    
    const cipher = ciphers[video];

    cipherText.textContent = cipher.ciphertext;
    hintInput.value = cipher.hint;
    videoLink.textContent = `"${cipher.title}"`;
    videoLink.href = 'https://youtu.be/' + video;

    if ("question" in cipher) {
        question.textContent = cipher.question;
        myAnswer.textContent = "The Answer"
    }
});

document.getElementById("key-form").addEventListener("submit", function(event) {
    event.preventDefault();
    decode();
});

document.getElementById("decode-button").addEventListener("click", decode);

document.getElementById("hint-link").addEventListener("click", function(event) {
    alert('Hint: ' + hintInput.value + '...');
});

keyInput.addEventListener("input", function(event) {
    event.target.value = event.target.value.replace(/[^A-Za-z]/g, '');
});


function decode() {
    const key = keyInput.value;
    keyInput.value = '';

    if (key == "") {
        return
    }

    plainSegment.classList.add("loading");
    keyField.classList.add("disabled");
    arrowIcon.classList.add("yellow");

    plainText.textContent = vigenere(cipherText.textContent, key);

    setTimeout(function() {
        plainSegment.classList.remove("loading");
        keyField.classList.remove("disabled");
    }, 1000);
}

const charOffset = 'A'.charCodeAt(0);
function vigenere(input, key) {
    let output = '';

    for (let i = 0; i < input.length; i++) {
        let c = charToCode(input[i]);

        if (c < 0 || c >= 26) {
            output += input[i];
            continue;
        }

        c -= charToCode(key[i % key.length]);
        output += String.fromCharCode(((c % 26) + 26) % 26 + charOffset);
    }

    return output;
}

function charToCode(char) {
    return char.toUpperCase().charCodeAt(0) - charOffset;
}
