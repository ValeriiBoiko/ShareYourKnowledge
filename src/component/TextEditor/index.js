import React, { useContext, useEffect } from 'react';
import styles from './TextEditor.module.css';
import ToolBar from './ToolBar';
import { store } from '../../store';
import { setModifiersAction } from '../../actions';

function TextEditor(props) {
  const { dispatch } = useContext(store);
  const setModifiers = (modifiers) => {
    dispatch(setModifiersAction(modifiers));
  }

  const updateModifiers = () => {
    if (!document.getSelection().focusNode) {
      return;
    }

    let currentSelectionModifiers = [];
    let currentNode = document.getSelection().focusNode.parentElement;

    while (
      currentNode.dataset && currentNode.dataset.id !== 'contentEditor'
      && currentNode.dataset.id !== 'contentEditorWrapper'
    ) {
      currentSelectionModifiers.push(currentNode.nodeName);
      currentNode = currentNode.parentNode;
    }

    setModifiers(currentSelectionModifiers);
  }

  const onChange = (e) => {
    props.onContentChange(e.currentTarget.innerHTML);
  }

  return (
    <div className={props.className}>
      <ToolBar />

      <div data-id='contentEditorWrapper' className={styles.contentTextareaWrapper}>
        <div
          data-id='contentEditor' data-placeholder='You know what you have to do ...'
          className={'textarea ' + styles.contentTextarea}
          contentEditable={true}
          onClick={updateModifiers} onInput={onChange}>
        </div>
      </div>
    </div >
  )
}

export default TextEditor;