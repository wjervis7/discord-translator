export function getErrorMessage(e: unknown): string {
    if (e instanceof Error) {
        return e.message;
    }

    return typeof e === "object" && e !== null && "toString" in e
        ? e.toString()
        : "";
}