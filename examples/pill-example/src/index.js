import pill from 'pill';

pill('#content', {
    onReady(){
        getScript();
    },
    onLoading(){
        console.log('loading')
        delete window.tom[`_${window.count}`];
    }
});

const content = document.getElementById('content')

// Based on: https://javascript.info/promise-basics#example-loadscript
function dynamicallyLoadScript(url) {
        return new Promise(function(resolve, reject) {
        var script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Error when loading ${url}!`));
        // document.body.appendChild(script);
        content.appendChild(script);
    });
}

function getScript(){
    
    switch(location.pathname){
        case '/pages/counter.html':
            dynamicallyLoadScript('../dist/counter.js');
            break;
    }
}

window.tom = {};
window.count = 0;