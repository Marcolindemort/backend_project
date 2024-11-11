export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
	if (!val) {
		throw Error("Val deve essere definito, invece di ricevere " + val);
	}
}
