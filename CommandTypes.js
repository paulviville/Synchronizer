
let commandNumber = 0;

export default class CommandTypes {
    static NEW_PLAYER = commandNumber++;
    static SET_PLAYER = commandNumber++;
    static REMOVE_PLAYER = commandNumber++;
    static UPDATE_CAMERA = commandNumber++;
    static UPDATE_POINTER = commandNumber++;

    static SELECT = commandNumber++;
    static DESELECT = commandNumber++;
    static MATRIX = commandNumber++;

    static STRING = commandNumber++;
}
