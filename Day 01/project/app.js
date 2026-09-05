console.log('New Hello, World!');
// DOM
const title = document.getElementById('title');
title.style.color = 'blue';
title.textContent = 'Hello, World! This is a new text.';

const button = document.getElementById('btn');
// button.addEventListener('click', function()
// {
//     title.style.color = 'green';
//     title.textContent = 'You clicked the button!';
//     console.log('Button clicked!');
// });


let count =0;
button.addEventListener('click', function()
{
    count++;
    title.textContent = `You clicked the button ${count} times!`;
} );

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function()
{  
    count = 0;
    title.textContent = 'Hello, World! This is a new text.';
} );