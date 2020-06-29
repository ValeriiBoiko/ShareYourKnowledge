import React, { useContext, useState } from 'react';
import ToolBar from './ToolBar';
import { store } from '../../../store';
import { setModifiersAction } from '../../../actions';

function ToolBarContainer(props) {
  const { state, dispatch } = useContext(store);
  const [isLinkFormVisible, setLinkFormVisibility] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isImageFormVisible, setImageFormVisibility] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const currentModifiers = state.newArticle.modifiers;

  const setModifiers = (modifiers) => {
    dispatch(setModifiersAction(modifiers));
  };

  const toggleCodeModifier = (tag, selection) => {
    tag = tag.toUpperCase();

    if (currentModifiers.indexOf(tag) === -1 && selection.toString().length) {
      setModifiers(currentModifiers.concat(tag));
      document.execCommand('insertHTML', false, `<${tag}>${selection.toString()}</${tag}>&nbsp;`)
    } else {
      setModifiers(currentModifiers.filter(modifier => modifier !== tag));
      if (selection.focusNode && selection.focusNode.parentElement.nodeName === tag) {
        const codeNode = selection.focusNode.parentElement;
        codeNode.parentNode.replaceChild(document.createTextNode(codeNode.textContent), codeNode)
      }
    }
  };

  const applyModifier = (command, tag = null, value = null) => {
    document.execCommand(command, false, value);

    if (!tag) return;

    if (currentModifiers.indexOf(tag) === -1) {
      setModifiers(currentModifiers.concat(tag));
    } else {
      setModifiers(currentModifiers.filter(modifier => modifier !== tag));
    }
  };

  return (
    <ToolBar {...props}
      isLinkFormVisible={isLinkFormVisible}
      isImageFormVisible={isImageFormVisible}
      linkUrl={linkUrl}
      onLinkUrlChange={setLinkUrl}
      imageUrl={imageUrl}
      onImageUrlChange={setImageUrl}
      applyModifier={applyModifier}
      applyCodeStyle={toggleCodeModifier}
      toggleLinkFormVisibility={() => {
        setLinkFormVisibility(!isLinkFormVisible)
      }}
      toggleImageFormVisibility={() => {
        setImageFormVisibility(!isImageFormVisible)
      }}
    />
  )
}

export default ToolBarContainer;