const supportedFormats = {
    "video": ["webm", "mp4"],
    "audio": ["mp3", "m4a",  "wav"]
}
const formatSelectionMenu = $("#format-selection")[0]
let currentDownloadFormat = "audio"
let downloadButton = $("#download-button")[0]
let downloadFormatButton = $("#switch-dl-format")[0]
populateFormatMenu()

function switchDownloadFormat() {
    if (currentDownloadFormat == "audio") {
        currentDownloadFormat = "video"
    } else {
        currentDownloadFormat = "audio"
    }
    downloadFormatButton.textContent = currentDownloadFormat
    populateFormatMenu();
}

function populateFormatMenu() {
    formatSelectionMenu.innerHTML = "";
    supportedFormats[currentDownloadFormat].forEach((format, idx) => {

        let placeholder = document.createElement("div")
        placeholder.innerHTML = `<option value=${format}> ${format} </option>`
        let node = placeholder.firstElementChild
        if (idx == 0) node.selected = true;

        formatSelectionMenu.append(node)
    });
}

function downloadFile() {
    let format = formatSelectionMenu.selectedOptions[0].value
    let link = $("#media-url")[0].value

    window.location = `../api/ytdl/${currentDownloadFormat}/${format}/?link=${link}`
}