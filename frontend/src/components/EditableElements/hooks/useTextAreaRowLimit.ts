type UseTextAreaRowLimit = {
    numberOfLines: number[] | undefined;
    updateStateOnChange: (field: string, value: string) => void;
}

const useTextAreaRowLimit = ({ numberOfLines, updateStateOnChange }: UseTextAreaRowLimit) => {
    const breakLineOnSpace = (textAreaValues: string[]) => {
        const COL_MAX_LENGTH = 80;
        const SEARCH_MARGIN = 10;
        return textAreaValues.map((str) => {
            if (str.length > COL_MAX_LENGTH) {
                str.slice(COL_MAX_LENGTH - SEARCH_MARGIN, COL_MAX_LENGTH + SEARCH_MARGIN);
                let breakIndex = str.lastIndexOf(' ') < 0 ? COL_MAX_LENGTH : str.lastIndexOf(' ');

                let p1 = str.slice(0, breakIndex);
                let rest = str.slice(breakIndex).trimStart();
                return p1.concat(`\n${rest}`);
            }
            return str;
        });
    }

    const limitRowsOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let textAreaId = e.target.id;
        let textAreaValue = e.target.value;

        if (!numberOfLines) {
            updateStateOnChange(textAreaId, textAreaValue);
            return;
        }

        let targetRows = breakLineOnSpace(textAreaValue.split('\n'));
        let targetRowsCount = targetRows.length;

        if (numberOfLines && targetRowsCount > numberOfLines[2]) {
            if (targetRows[targetRows.length - 2].length > 80) {
                return;
            }
            updateStateOnChange(textAreaId, targetRows.slice(0, numberOfLines[2]).join('\n'));
            return;
        }
        updateStateOnChange(textAreaId, targetRows.join('\n'));
    }

    return {
        limitRowsOnChange
    }
}

export default useTextAreaRowLimit;