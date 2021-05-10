import playlist from './data.js';

// Smooth fade on load
window.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(function() {
        document.body.className = 'visible';
    }, 230);
});

// Dynamic items
const artist = document.querySelector('.artist');
const track = document.querySelector('.track');
const progress = document.querySelector('.progress-bar');
const loop = document.getElementById('loop');
const shuffle = document.querySelector('.btn-shuffle');
const back = document.getElementById('btn-back');
const next = document.getElementById('btn-next');
const rewind = document.querySelector('.btn-rewind');
const forward = document.querySelector('.btn-forward');
const toggle = document.getElementById('btn-toggle');
const currentTime = document.querySelector('.current-time');
const totalTime = document.querySelector('.total-time');


let audio = new Audio();
let current = 0;
artist.textContent = playlist[current].artist;
track.textContent = playlist[current].track;

const timeFunction = () => {
    let current = audio.currentTime;
    let percent = (current / audio.duration) * 80;
    progress.style.width = percent + '%';

    currentTime.textContent = formatTime(current);
}

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

// Loads initial track
window.addEventListener('load', () => {
    init();
});

// Play-Pause toggle
toggle.addEventListener('click', e => {
    audioToggle(e);
    imgToggle(e);
});

// Rewinds track by 5 seconds
rewind.addEventListener('click', e => {
    rewindTrack(e);
});

// Jumps track forward by 5 seconds
forward.addEventListener('click', e => {
    forwardTrack(e);
});

// Loads next track
next.addEventListener('click', e => {
    nextTrack(e);
});

// Loads previous track
back.addEventListener('click', e => {
    prevTrack(e);
});

// Puts song on repeat/loop
loop.addEventListener('click', e => {
    replay(e);
})

// Shuffles playlist
shuffle.addEventListener('click', () => {
    shufflePlaylist(playlist);
    shuffle.style.color = "rgb(97, 36, 36)";
});

// Updates duration
audio.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(audio.duration);
});

// Updates time progress
audio.addEventListener('timeupdate', timeFunction);

const init = () => {
    audio.src = playlist[current].file;
    artist.textContent = playlist[current].artist;
    track.textContent = playlist[current].track;
    progress.style.width = 0;
};

const audioToggle = () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};

const imgToggle = () => {
    if (audio.paused) {
        toggle.className = ('fas fa-play');
    } else {
        toggle.className = ('fas fa-pause');
    }
}

const replay = () => {
    if (audio.loop == true) {
        audio.loop = false;
        loop.style.color = "#fff";
    }
    else {
        audio.loop = true;
        loop.style.color = "rgb(97, 36, 36)";
    }
}

const shufflePlaylist = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const n = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[n]] = [arr[n], arr[i]];
    }
    return arr;
}

const rewindTrack = () => {
    audio.currentTime = audio.currentTime - 5
    timeFunction();
}

const forwardTrack = () => {
    audio.currentTime = audio.currentTime + 5
    timeFunction();
}

const nextTrack = () => {
    current++;
    if (current > 9) {
        current = 0;
    }
    init();
    toggle.className = ('fas fa-play');
};

const prevTrack = () => {
    current--;
    if (current < 0) {
        current = 9;
    }
    init();
    toggle.className = ('fas fa-play');
};