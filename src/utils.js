export function formatString(str) {
    const replacedStr = str.replace(/_/g, ' ');
    return replacedStr.toUpperCase();
}