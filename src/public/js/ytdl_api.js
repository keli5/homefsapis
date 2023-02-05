
let downloadButton = $("#download-button")[0]

function downloadFile() {
    let format = $("#format-selection")[0].selectedOptions[0].value
    let link = $("#media-url")[0].value

    window.location = `../api/ytdl/audio/${format}/?link=${link}`
}