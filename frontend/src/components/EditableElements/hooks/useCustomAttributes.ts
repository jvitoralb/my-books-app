import { EditableInputAttr, EditableTextAreaAttr } from "../../../types";


const useCustomAttributes = (customAttr: EditableTextAreaAttr | EditableInputAttr, src?: string) => {
    const defaults: { textarea: EditableTextAreaAttr; input: EditableInputAttr; } = {
        textarea: {
            maxLength: undefined,
            height: "24vh",
            minHeight: "24vh",
            maxHeight: undefined,
            width: undefined,
            minWidth: undefined,
            maxWidth: "75vw",
            numberOfLines: undefined,
            refObserver: undefined,
        },
        input: {
            maxLength: undefined,
            height: undefined,
            minHeight: undefined,
            maxHeight: undefined,
            width: undefined,
            minWidth: undefined,
            maxWidth: "70vw",
        }
    }
    const defaultAttributes: EditableTextAreaAttr | EditableInputAttr = { }

    if (src === 'input') {
        Object.assign(defaultAttributes, defaults.input);
    } else {
        Object.assign(defaultAttributes, defaults.textarea);
    }

    const attributes: EditableTextAreaAttr = { }

    for (const [ key, value ] of Object.entries(defaultAttributes)) {
        if (Object(customAttr).hasOwnProperty(key)) {
            Object.defineProperty(attributes, key, { value: Object(customAttr)[key] });
        } else {
            Object.defineProperty(attributes, key, { value });
        }
    }

    return attributes;
}

export default useCustomAttributes;