import React, { useState } from 'react';
import styles from './CreateArticleForm.module.css';

function getSelectionText() {
    var offset = 0;
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var start = range.startOffset;
    var end = range.endOffset;

    if (selection.baseNode.parentNode.hasChildNodes()) {
        for (var i = 0; selection.baseNode.parentNode.childNodes.length > i; i++) {
            var cnode = selection.baseNode.parentNode.childNodes[i];
            if (cnode.nodeType == document.TEXT_NODE) {
                if ((offset + cnode.length) > start) {
                    break;
                }
                offset = offset + cnode.length;
            }
            if (cnode.nodeType == document.ELEMENT_NODE) {
                if ((offset + cnode.textContent.length) > start) {
                    break;
                }
                offset = offset + cnode.textContent.length;
            }
        }
    }

    start = start + offset;
    end = end + offset;

    return {
        start: start,
        end: end,
    };
}

function wrapWithTag(tag, text) {
    return `<${tag}>` + text + `</${tag}>`;
}


function CreateArticleForm(props) {
    const [content, setContent] = useState('Hello, world');

    /*
    
    bold
    defaultParagraphSeparator
    foreColor
    heading:H1-H6
    insertBrOnReturn
    insertUnorderedList
    insertParagraph
    italic
    justifyCenter
    justifyFull
    justifyLeft
    justifyRight
    strikeThrough
    

    */
    const format = (command, value) => {
        document.execCommand(command, false, value);
    }

    function setUrl() {
        var url = document.getElementById('txtFormatUrl').value;
        var sText = document.getSelection();
        document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
        document.getElementById('txtFormatUrl').value = '';
    }

    const onFormatClick = (e, command, value = undefined) => {
        e.preventDefault();

        format(command, value)
    }

    return (
        <div>
            <form action="" className={styles.form}>
                <input type="text" className={styles.input + ' text-input ' + styles.titleInput} placeholder={'Title'} />
                <input type="text" className={styles.input + ' text-input ' + styles.categoriesInput} placeholder="react, idx, php, laravel ..." />

                <div style={{
                    flex: 1,
                    minWidth: '100%'
                }}>
                    <button onClick={(e) => onFormatClick(e, 'italic')} >I</button>
                    <button onClick={(e) => onFormatClick(e, 'bold')} >B</button>
                    <button onClick={(e) => onFormatClick(e, 'strikeThrough')} >S</button>
                    <select name="" id="" onChange={(e) => {
                        format('heading', e.currentTarget.value)
                    }}>
                        <option value="H1">H1</option>
                        <option value="H3">H3</option>
                        <option value="H6">H6</option>
                    </select>
                </div>

                <div className={'textarea ' + styles.contentTextarea} contentEditable={true} onKeyPress={(e) => {
                    console.log(e.currentTarget.innerHTML);
                }} dangerouslySetInnerHTML={{ __html: content }}>
                </div>
            </form>
        </div >
    )
}

export default CreateArticleForm;