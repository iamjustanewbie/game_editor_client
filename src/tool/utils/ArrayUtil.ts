module tool.utils {
    export class ArrayUtil {

        public static insertAt<T>(array: Array<T>, index: number, object: T): void {
            let i: number;
            let length: number = array.length;
            if (index < 0) {
                index += length + 1;
            }
            if (index < 0) {
                index = 0;
            }
            for (i = index - 1; i >= length; --i) {
                array[i] = null;
            }
            for (i = length; i > index; --i) {
                array[i] = array[Math.floor(i - 1)];
            }
            array[index] = object;
        }

        public static removeAt<T>(array: Array<T>, index: number): T {
            let i: number;
            let length: number = array.length;

            if (index < 0) {
                index += length;
            }
            if (index < 0) {
                index = 0;
            } else if (index >= length) {
                index = length - 1;
            }
            let object: any = array[index];
            for (i = index + 1; i < length; ++i) {
                array[Math.floor(i - 1)] = array[i];
            }
            array.length = length - 1;
            return object;
        }

    }

}