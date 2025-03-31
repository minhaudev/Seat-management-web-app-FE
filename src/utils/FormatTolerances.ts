export const FormatTolerances = (
    tolerances: {key: string; value: number[]}[] | Record<string, number[]>
): {value1: string; value2: string} => {
    const result: string[] = [];
    if (Array.isArray(tolerances)) {
        tolerances.forEach((tolerance) => {
            result.push(`${tolerance.value.join(" - ")} (${tolerance.key})`);
        });
    } else {
        Object.keys(tolerances).forEach((key) => {
            const values = tolerances[key];
            result.push(`${values.join(" - ")} (${key})`);
        });
    }
    return {
        value1: result[0],
        value2: result[1]
    };
};
