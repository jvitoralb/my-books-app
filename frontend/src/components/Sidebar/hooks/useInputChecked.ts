import { useState } from 'react';


const useInputChecked = () => {
    const [ checked, setChecked ] = useState(false);

    const setInputChecked = (val: boolean) => {
        if (val !== checked) setChecked(val);
    }

    const onChangeCheckedHandler = (e: React.ChangeEvent) => {
        let target = e.target as HTMLInputElement;
        setInputChecked(target.checked);
    }

    return {
        checked,
        setInputChecked,
        onChangeCheckedHandler,
    }
}

export default useInputChecked;