const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');


const bomBooks = [
    '1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni',
    'Words of Mormon', 'Mosiah', 'Alma', 'Helaman', '3 Nephi',
    '4 Nephi', 'Mormon', 'Ether', 'Moroni'
];

function formatInput(value) {
    return value.trim().replace(/\s+/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function isValidBOMChapter(value) {
    const formatted = formatInput(value);
    return bomBooks.some(book => formatted.toLowerCase().startsWith(book.toLowerCase()));
}

function isDuplicate(value) {
    const items = list.querySelectorAll('li');
    const formattedValue = formatInput(value).toLowerCase();
    for (let item of items) {
        const itemText = item.childNodes[0].textContent.trim().toLowerCase();
        if (itemText === formattedValue) {
            return true;
        }
    }
    return false;
}


function showFeedback(message, type = 'error') {
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    feedback.setAttribute('role', 'alert');
    feedback.setAttribute('aria-live', 'polite');
    
    list.parentNode.insertBefore(feedback, list);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 3000);
}


button.addEventListener('click', function() {

    const rawInput = input.value;
    const formattedInput = formatInput(rawInput);
    
    if (formattedInput === '') {
        showFeedback('Please enter a Book of Mormon chapter.', 'error');
        input.focus();
        return;
    }
    
    if (!isValidBOMChapter(formattedInput)) {
        showFeedback('Please enter a valid Book of Mormon book and chapter (e.g., Alma 5, 1 Nephi 3:7).', 'error');
        input.focus();
        return;
    }
    
    const currentEntries = list.querySelectorAll('li').length;
    if (currentEntries >= 10) {
        showFeedback('You can only have 10 favorite chapters. Please remove one before adding another.', 'warning');
        input.focus();
        return;
    }
    
    if (isDuplicate(formattedInput)) {
        showFeedback(`"${formattedInput}" is already in your list.`, 'warning');
        input.focus();
        return;
    }
    
    const li = document.createElement('li');

    const deleteButton = document.createElement('button');

    li.textContent = formattedInput;

    deleteButton.textContent = '❌';
    
    deleteButton.setAttribute('aria-label', `Remove ${formattedInput}`);
    deleteButton.setAttribute('title', `Remove ${formattedInput}`);

    li.append(deleteButton);

    list.append(li);
    
    showFeedback(`"${formattedInput}" added to your Top 10!`, 'success');

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        showFeedback(`"${formattedInput}" removed from your list.`, 'success');
        input.focus();
    });

    input.value = '';

    input.focus();
});

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});