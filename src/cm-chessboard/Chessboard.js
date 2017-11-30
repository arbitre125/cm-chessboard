/**
 * Author: shaack
 * Date: 21.11.2017
 */
import {ChessboardView} from "./ChessboardView.js";
import {ChessboardModel} from "./ChessboardModel.js";


export const COLOR = {
    white: "white",
    black: "black"
};
export const INPUT_MODE = {
    dragFigure: 1,
    showMarker: 2
};
export const MARKER_TYPE = {
    newMove: {slice: "marker1", opacity: 0.9},
    lastMove: {slice: "marker1", opacity: 0.5},
    emphasize: {slice: "marker2", opacity: 0.5}
};
export const startPositionFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const DEFAULT_SPRITE_GRID = 40;

export class Chessboard {

    constructor(containerElement, config = {}) {
        this.config = {
            position: startPositionFen,
            orientation: COLOR.white, // white on bottom
            showNotation: false, // TODO
            responsive: false, // detect window resize
            inputMode: INPUT_MODE.dragFigure, // type of interactive movement with mouse or tap
            sprite: {
                file: "../assets/sprite.svg", // figures and markers
                grid: DEFAULT_SPRITE_GRID, // one figure every 40 px
            },
            events: {
                beforeMove: null, // callback, before figure move
                afterMove: null // callback after figure move
            }
        };
        Object.assign(this.config, config);
        if(!this.config.sprite.grid) {
            this.config.sprite.grid = DEFAULT_SPRITE_GRID;
        }
        this.model = new ChessboardModel();
        this.view = new ChessboardView(containerElement, this.model, this.config, () => {
            this.setPosition(this.config.position);
            this.setOrientation(this.config.orientation);
            this.model.inputMode = this.config.inputMode;
            this.view.redraw(); // TODO remove and redraw on observer
        });
    }

    // API

    addMarker(field, type = MARKER_TYPE.emphasize) {
        this.model.addMarker(field, type);
    }

    /**
     * Set field to null to remove all marker from board.
     * Set type to null, to remove all types.
     * @param field
     * @param type
     */
    removeMarker(field = null, type = MARKER_TYPE.emphasize) {
        this.model.removeMarker(field, type);
    }

    setPosition(fen) {
        this.model.setPosition(fen);
    }

    getPosition() {
        // return this.model.createFen(); // TODO
    }

    setOrientation(color) {
        this.model.orientation = color;
    }

    getOrientation() {
        return this.model.orientation;
    }

    /**
     * Enables moves via user input, mouse or touch
     * @param color
     * @param enable
     */
    /* TODO think about it again
    setEnableMoveFigures(color, enable) {
        if (color === COLOR.white) {
            this.model.moveInputWhiteEnabled = enable;
        } else if (color === COLOR.black) {
            this.model.moveInputBlackEnabled = enable;
        }
    }
    */

}