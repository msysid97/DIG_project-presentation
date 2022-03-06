/**
 * ビジーwait
 * @param {number} waitMS - 待機時間(ms)
 */
function sleep(waitMS) {
    var startMS = new Date();
    while (new Date() - startMS < waitMS);
}