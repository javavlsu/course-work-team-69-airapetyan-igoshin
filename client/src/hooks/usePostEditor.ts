// now this is unused

import {
  CompositeDecorator,
  DraftBlockType,
  DraftEntityMutability,
  EditorState,
  RichUtils
} from 'draft-js'
import {
  htmlToState,
  stateToHtml
} from '../components/TextEditor/components/ConverterToHtml/ConverterToHtml'
import { EntityType } from '../components/TextEditor/TextEditor.config'
import { useState } from 'react'
import LinkDecorator from '../components/TextEditor/components/Link'

const decorator = new CompositeDecorator([LinkDecorator])

export const usePostEditor = (html?: string) => {
  const [state, setState] = useState(() =>
    html
      ? EditorState.createWithContent(htmlToState(html))
      : EditorState.createEmpty(decorator)
  )

  const onChange = (newState: EditorState) => {
    setState(newState)
  }

  const toggleBlockType = (blockType: DraftBlockType) => {
    setState(RichUtils.toggleBlockType(state, blockType))
  }

  const currentBlockType = () => {
    const selection = state.getSelection()
    const content = state.getCurrentContent()
    const block = content.getBlockForKey(selection.getStartKey())

    return block.getType()
  }

  const toggleInlineStyles = (inlineType: string) => {
    setState(RichUtils.toggleInlineStyle(state, inlineType))
  }

  const addEntity = (
    entityType: EntityType,
    data: Record<string, string>,
    mutability: DraftEntityMutability
  ) => {
    const contentState = state.getCurrentContent()
    /* Создаем Entity с данными */
    const contentStateWithEntity = contentState.createEntity(
      entityType,
      mutability,
      data
    )
    /* Получаем уникальный ключ Entity */
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    /* Обьединяем текущее состояние с новым */
    const newState = EditorState.set(state, {
      currentContent: contentStateWithEntity
    })
    /* Вставляем ссылку в указанное место */
    const updatedState = RichUtils.toggleLink(
      newState,
      newState.getSelection(),
      entityKey
    )

    setState(updatedState)
  }

  const addLink = (url: string) => {
    addEntity(EntityType.link, { url }, 'MUTABLE')
  }

  const setEntityData = (entityKey: string, data: any) => {
    const content = state.getCurrentContent()
    const contentStateUpdated = content.mergeEntityData(entityKey, data)
    const newState = EditorState.push(
      state,
      contentStateUpdated,
      'apply-entity'
    )

    setState(newState)
  }

  const toHtml = () => {
    return stateToHtml(state.getCurrentContent())
  }

  return {
    toHtml,
    addLink,
    onChange,
    toggleBlockType,
    currentBlockType,
    toggleInlineStyles,
    setEntityData
  }
}
