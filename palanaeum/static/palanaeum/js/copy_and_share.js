function get_plain_text(entry) {
    let lines = [];
    if (entry.hasClass('entry-suggestion')) {
        lines.push('[suggestion]');
    }
    for (let elem of entry.find('.entry-content').find('h4, p')) {
        if (elem.tagName === 'H4') {
            lines.push("");
        }
        lines.push(elem.innerText);
    }
    lines.push("");
    let footnote = entry.find(".footnote").text();
    if (footnote) {
        lines.push(footnote);
        lines.push("");
    }
    lines.push(entry.find(".share-btn")[0].href);

    return lines.join("\r\n").trim();
}

function get_rich_text(entry) {
    let main_content = entry.find('.entry-content').html();
    let footnote = entry.find('.footnote').html();
    let entry_url = entry.find(".share-btn")[0].href;
    let event_name = entry.find(".entry-event-name").text();
    let suggestion = "";
    if (entry.hasClass('entry-suggestion')) {
        suggestion = "<header><em style='font-weight: bold;'>[suggestion]</em></header>";
    }

    if (!footnote)
        footnote = "";
    else
        footnote += "<br/>";

    return `<article>
                ${suggestion}
                <section>${main_content}</section>
                <footer>
                    <small>
                        ${footnote}
                        <a href="${entry_url}" target="_blank">${event_name}</a>
                    </small>
                </footer>
            </article>`
}


function copy_entry_text(event) {
    let entry_id = $(this)[0].dataset.entryId;
    let entry = $(`#e${entry_id}`);
    let clipboard_buffer = new clipboard.DT();

    clipboard_buffer.setData("text/plain", get_plain_text(entry));
    clipboard_buffer.setData("text/html", get_rich_text(entry));

    clipboard.write(clipboard_buffer);

    event.preventDefault();
    noty({"type": "success", "text": gettext("Entry copied to clipboard.")});
    return false;
}

function copy_entry_link(event) {
    let clipboard_buffer = new clipboard.DT();
    const entry_url = this.href;

    clipboard_buffer.setData("text/plain", entry_url);

    clipboard.write(clipboard_buffer);

    event.preventDefault();
    noty({"type": "success", "text": gettext("Copied entry URL to clipboard.")});
    return false;
}

$(function(){
    $('.copy-btn').click(copy_entry_text);
    $('.share-btn').click(copy_entry_link);
});
