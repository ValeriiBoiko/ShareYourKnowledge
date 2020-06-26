import React, { useContext } from 'react';
import styles from '../TextEditor.module.css';
import { store } from '../../../store';

function ToolBar(props) {
  const { state } = useContext(store);
  const currentModifiers = state.newArticle.modifiers;
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

    return <option value={item.value} selected={isActive} key={item.value}>{item.label}</option>;
  })

  const fontStyleOptions = fontStyles.map(item => {
    return (
      <a className={'buttonGroupButton ' + styles.buttonGroupButton + ' ' + isActiveModifier(item.value, 'active')}
        key={item.value}
        href={'#'} onClick={(e) => {
          e.preventDefault();
          props.applyFontStyle(item.command, item.value);
        }}>{item.label}</a>
    );
  })

  function isActiveModifier(modifier, returnIfActive = false) {
    const isActive = currentModifiers.indexOf(modifier) >= 0;

    if (isActive && returnIfActive) {
      return returnIfActive;
    } else {
      return isActive;
    }
  }

  return (
    <div className={props.className}>
      <div className={styles.toolBar}>

        <div className={'buttonGroup'}>
          {fontStyleOptions}
        </div>

        <select className={styles.dropdownModifier} id="" onChange={(e) => {
          props.applyHeader('formatBlock', e.currentTarget.value.toUpperCase(), e.currentTarget.value);
        }}>
          {headerOptions}
        </select>

        <div className={'buttonGroup'}>
          <a className={'icon-code-1 buttonGroupButton ' + styles.buttonGroupButton + ' ' + isActiveModifier('PRE', 'active')}
            href='#' onClick={(e) => {
              e.preventDefault();
              props.applyCodeStyle('pre', 'p', 'code', 'no-margin')
            }}></a>

          <a className={'icon-th-list buttonGroupButton ' + styles.buttonGroupButton + ' ' + isActiveModifier('UL', 'active')}
            href='#' onClick={(e) => {
              e.preventDefault();
              props.applyList('insertUnorderedList');
              // props.applyCodeStyle('pre', 'p', 'code', 'no-margin')
            }}></a>

          <div className={'icon-link buttonGroupButton ' + styles.buttonGroupButton + ' '} tabindex='0'>
            <form className={styles.popupForm}>
              <div className={'flex-column'}>
                <input className={'text-input'} type="text" placeholder={'Anchor'} />
                <input className={'text-input'} type="text" placeholder={'URL'} />
              </div>
              <button>ADD</button>
            </form>
          </div>

          <a className={'icon-picture buttonGroupButton ' + styles.buttonGroupButton + ' '}
            href='#' onClick={(e) => {
              e.preventDefault();
              // props.applyCodeStyle('pre', 'p', 'code', 'no-margin')
            }}></a>
        </div>

      </div>
    </div >
  )
}

export default ToolBar;