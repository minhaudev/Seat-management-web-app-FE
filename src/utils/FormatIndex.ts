export function FormatIndex(index: number, length: number) {
    return index.toString().padStart(length.toString().length, '0')
}