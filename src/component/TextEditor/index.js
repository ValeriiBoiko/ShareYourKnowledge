import React, { useContext } from 'react';
import styles from './TextEditor.module.css';
import ToolBar from './ToolBar';
import { store } from '../../store';
import { setModifiersAction } from '../../actions';

function TextEditor(props) {
  const {dispatch} = useContext(store);
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

  return (
    <div className={props.className}>
      <ToolBar />

      <div data-id='contentEditorWrapper' class={styles.contentTextareaWrapper}>
        <div data-id='contentEditor' className={'textarea ' + styles.contentTextarea} 
        contentEditable={true} 
        onClick={updateModifiers} onBlur={(e) => {
          props.onChangeContent(e.currentTarget.innerHTML);
        }}>
        </div>
      </div>
    </div >
  )
}

export default TextEditor;