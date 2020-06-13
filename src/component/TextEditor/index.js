import React, { useState, useEffect } from 'react';
import styles from './TextEditor.module.css';

function TextEditor(props) {
  const [content, setContent] = useState('Hello, world');
  const [currentModifiers, setModifiers] = useState([]);
  const headers = [
    {
      value: 'p',
      label: 'None'
    },
    {
      value: 'h2',
      label: 'Header 2'
    },
    {
      value: 'h3',
      label: 'Header 3'
    },
    {
      value: 'h4',
      label: 'Header 4'
    }
  ];
  const fontStyles = [
    {
      command: 'bold',
      value: 'B',
      label: 'B'
    },
    {
      command: 'italic',
      value: 'I',
      label: 'I'
    },
    {
      command: 'strikeThrough',
      value: 'STRIKE',
      label: 'S'
    },
  ];

  const headerOptions = headers.map(item => {
    const isActive = isActiveModifier(item.value.toUpperCase());

    return <option value={item.value} selected={isActive}>{item.label}</option>;
  })

  const fontStyleOptions = fontStyles.map(item => {
    return (
      <a className={'buttonGroupButton ' + isActiveModifier(item.value, 'active')} 
        href={'#'} onClick={(e) => {
          e.preventDefault();
          setModifier(item.command, item.value);
        }}>{item.label}</a>
    );
  })

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  }

  const setFormatBlockModifier = (tag, alternateTag, tagClass, alternateTagClass) => {
    if (!isActiveModifier(tag.toUpperCase())) {
      setModifier('formatBlock', tag.toUpperCase(), tag);
      document.getSelection().focusNode.parentNode.classList.add(tagClass);
    } else {
      setModifiers(currentModifiers.filter(modifier => modifier !== tag.toUpperCase()));
      setModifier('formatBlock', alternateTag.toUpperCase(), alternateTag);
      document.getSelection().focusNode.parentNode.classList.add(alternateTagClass);
    }
  }

  const setModifier = (command, tag, value = null) => {
    format(command, value);

    if (currentModifiers.indexOf(tag) === -1) {
      setModifiers(currentModifiers.concat(tag));
    } else {
      setModifiers(currentModifiers.filter(modifier => modifier !== tag));
    }

    updateModifiers();
  }

  const updateModifiers = () => {
    if (!document.getSelection().focusNode) {
      return;
    }
    
    let currentSelectionModifiers = [];
    let currentNode = document.getSelection().focusNode.parentElement;

    while (currentNode.dataset.id !== 'contentEditor') {
      currentSelectionModifiers.push(currentNode.nodeName);
      currentNode = currentNode.parentNode;
    }

    setModifiers(currentSelectionModifiers);
  }

  function isActiveModifier (modifier, returnIfActive = false) {
    const isActive = currentModifiers.indexOf(modifier) >= 0;

    if (isActive && returnIfActive) {
      return returnIfActive;
    } else {
      return isActive;
    }
  }

  return (
    <div style={props.style}>
      <div className={styles.toolBar}>
        <div className={'buttonGroup'}>
          {fontStyleOptions}
        </div>

        <select className={styles.dropdownModifier} id="" onChange={(e) => {
          setModifier('formatBlock', e.currentTarget.value.toUpperCase(), e.currentTarget.value);
        }}>
          {headerOptions}
        </select>

        <div className={'buttonGroup'}>
          <a className={'buttonGroupButton ' + isActiveModifier('PRE', 'active')} 
            href='#' onClick={(e) => {
              e.preventDefault();
              setFormatBlockModifier('pre', 'p', 'code', 'noMargin')
            }}>Code</a>
        </div>

      </div>

      <div data-id='contentEditorWrapper' class={styles.contentTextarea}>
        <div data-id='contentEditor' className={'textarea ' + styles.contentTextarea} 
        contentEditable={true} dangerouslySetInnerHTML={{ __html: content }} 
        onClick={updateModifiers} >
        </div>
      </div>
    </div >
  )
}

export default TextEditor;