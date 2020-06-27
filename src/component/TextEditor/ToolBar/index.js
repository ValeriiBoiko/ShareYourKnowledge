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
  }

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  }

  const applyFormatBlockModifier = (tag, alternateTag, tagClass, alternateTagClass) => {
    if (!isActiveModifier(tag.toUpperCase())) {
      applyModifier('formatBlock', tag.toUpperCase(), tag);
      document.getSelection().focusNode.parentNode.classList.add(tagClass);
    } else {
      setModifiers(currentModifiers.filter(modifier => modifier !== tag.toUpperCase()));
      applyModifier('formatBlock', alternateTag.toUpperCase(), alternateTag);
      document.getSelection().focusNode.parentNode.classList.add(alternateTagClass);
    }
  }

  const applyModifier = (command, tag, value = null) => {
    format(command, value);

    if (currentModifiers.indexOf(tag) === -1) {
      setModifiers(currentModifiers.concat(tag));
    } else {
      setModifiers(currentModifiers.filter(modifier => modifier !== tag));
    }
  }

  function isActiveModifier(modifier, returnIfActive = false) {
    const isActive = currentModifiers.indexOf(modifier) >= 0;

    if (isActive && returnIfActive) {
      return returnIfActive;
    } else {
      return isActive;
    }
  }

  return (
    <ToolBar {...props}
      isLinkFormVisible={isLinkFormVisible}
      isImageFormVisible={isImageFormVisible}
      linkUrl={linkUrl}
      onLinkUrlChange={setLinkUrl}
      imageUrl={imageUrl}
      onImageUrlChange={setImageUrl}
      applyFontStyle={applyModifier}
      applyHeader={applyModifier}
      applyCodeStyle={applyFormatBlockModifier}
      applyList={applyModifier}
      applyLink={format}
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