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
          props.applyModifier(item.command, item.value);
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
          props.applyModifier('formatBlock', e.currentTarget.value.toUpperCase(), e.currentTarget.value);
        }}>
          {headerOptions}
        </select>

        <div className={'buttonGroup'}>
          <a className={'icon-code-1 buttonGroupButton ' + styles.buttonGroupButton + ' ' + isActiveModifier('SPAN.CODE', 'active')}
            href='#' onClick={(e) => {
              e.preventDefault();
              props.applyCodeStyle('span', document.getSelection(), 'code')
            }}></a>

          <a className={'icon-th-list buttonGroupButton ' + styles.buttonGroupButton + ' ' + isActiveModifier('UL', 'active')}
            href='#' onClick={(e) => {
              e.preventDefault();
              props.applyModifier('insertUnorderedList');
            }}></a>

          <div className={'buttonGroupButton ' + styles.buttonGroupButton} onClick={() => false}>
            <a className={'icon-link '}
              href='#' onClick={(e) => {
                e.preventDefault();
                props.toggleLinkFormVisibility();
                return false
              }}></a>
            {
              props.isLinkFormVisible && (
                <form className={styles.popupForm}>
                  {/* <div className={'flex-column'}> */}
                  <input value={props.linkUrl} onChange={e => {
                    props.onLinkUrlChange(e.currentTarget.value);
                  }} className={'text-input'} name={'url'} type="text" placeholder={'URL'} />
                  {/* </div> */}
                  <button onClick={(e) => {
                    e.preventDefault();
                    props.applyModifier('createLink', null, props.linkUrl);
                  }}>ADD</button>
                </form>
              )
            }
          </div>

          <div className={'buttonGroupButton ' + styles.buttonGroupButton}>
            <a className={'icon-picture '}
              href='#' onClick={(e) => {
                e.preventDefault();
                props.toggleImageFormVisibility();
                return false
              }}></a>
            {
              props.isImageFormVisible && (
                <form className={styles.popupForm}>
                  <input value={props.imageUrl} onChange={e => {
                    props.onImageUrlChange(e.currentTarget.value);
                  }} className={'text-input'} name={'image'} type="text" placeholder={'Image URL'} />
                  <button onClick={(e) => {
                    e.preventDefault();
                    props.applyLink('insertImage', props.imageUrl);
                  }}>ADD</button>
                </form>
              )
            }
          </div>
        </div>

      </div>
    </div >
  )
}

export default ToolBar;