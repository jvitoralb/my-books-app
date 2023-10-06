export const firstCharToUpper = (word: string) => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}

export const treatLabels = (label: string) => {
    let newLabel = label;

    if (newLabel.match('_')) {
        newLabel = newLabel.replace('_', ' ');
    }

    newLabel = firstCharToUpper(newLabel);

    return newLabel;
}
