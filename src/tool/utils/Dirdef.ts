module tool.utils {
    export const enum Direction {
        NONE = 0,
        UP = 1,
        RIGHT_UP = 2,
        RIGHT = 3,
        RIGHT_DOWN = 4,
        DOWN = 5,
        LEFT_DOWN = 6,
        LEFT = 7,
        LEFT_UP = 8,
    }

    export const MirDir = {
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.LEFT_UP]: Direction.RIGHT_UP,
        [Direction.LEFT_DOWN]: Direction.RIGHT_DOWN,
    };

    export const ReversalDir = {
        [Direction.RIGHT]: Direction.LEFT,
        [Direction.RIGHT_UP]: Direction.LEFT_DOWN,
        [Direction.UP]: Direction.DOWN,
        [Direction.LEFT_UP]: Direction.RIGHT_DOWN,
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.LEFT_DOWN]: Direction.RIGHT_UP,
        [Direction.DOWN]: Direction.UP,
        [Direction.RIGHT_DOWN]: Direction.LEFT_UP,
    };
}