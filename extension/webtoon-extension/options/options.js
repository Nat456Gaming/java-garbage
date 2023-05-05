function save() {
    chrome.storage.sync.set({
        first: document.getElementById('first').checked,
        second: document.getElementById('second').checked,
        third: document.getElementById('third').checked,
        fourth: document.getElementById('fourth').checked},() => {
    console.log("settings changed")});
};

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({ first: false, second: false, third: false, fourth: false },(items) => {
        document.getElementById('first').checked = items.first;
        document.getElementById('second').checked = items.second;
        document.getElementById('third').checked = items.third;
        document.getElementById('fourth').checked = items.fourth;
    });
    document.getElementById('first').addEventListener('change', save);
    document.getElementById('second').addEventListener('change', save);
    document.getElementById('third').addEventListener('change', save);
    document.getElementById('fourth').addEventListener('change', save);
});