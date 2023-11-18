export const firstCharToUpper = (word: string) => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}

export const treatLabels = (label: string) => {
    let newLabel = '';
    
    if (label.includes('_')) {
        for(let i = 0; i < label.length; i++) {
            if (label[i] === '_') {
                newLabel += ' ';
            } else {
                newLabel += label[i];
            }
        }
    } else {
        newLabel = label;
    }

    return firstCharToUpper(newLabel);
}
