export const firstCharToUpper = (word: string) => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}

const replaceChar = (string: string, char: string, replaceChar: string) => {
    let newStr = '';
    
    for(let i = 0; i < string.length; i++) {
        if (string.charAt(i) === char) {
            newStr += replaceChar;
        } else {
            newStr += string.charAt(i);
        }
    }

    return newStr;
}

export const treatLabels = (label: string) => {
    let newLabel = '';
    
    if (label.includes('_')) {
        newLabel = replaceChar(label, '_', ' ');
    } else {
        newLabel = label;
    }

    return firstCharToUpper(newLabel);
}

export const treatLabelsHyphen = (label: string) => {
    let newLabel = '';
    
    if (label.includes('-')) {
        newLabel = replaceChar(label, '-', ' ');
    } else {
        newLabel = label;
    }

    return firstCharToUpper(newLabel);
}
