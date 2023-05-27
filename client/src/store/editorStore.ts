import { makeAutoObservable } from 'mobx'
import {
  CompositeDecorator,
  DraftBlockType,
  DraftEntityMutability,
  EditorState,
  RichUtils,
  convertFromHTML,
  ContentState
} from 'draft-js'
import LinkDecorator from '../components/TextEditor/components/Link'
import { EntityType } from '../components/TextEditor/TextEditor.config'
import { stateToHtml } from '../components/TextEditor/components/ConverterToHtml/ConverterToHtml'

const decorator = new CompositeDecorator([LinkDecorator])

class EditorStore {
  state: EditorState
  lastPost = ''

  constructor() {
    makeAutoObservable(this)
    this.state = EditorState.createEmpty(decorator)
  }

  loadContent(html: string) {
    const htmlBlock = convertFromHTML(html)
    const contentState = ContentState.createFromBlockArray(
      htmlBlock.contentBlocks,
      htmlBlock.entityMap
    )

    this.state = EditorState.createWithContent(contentState, decorator)
  }

  onChange = (newState: EditorState) => {
    this.state = newState
  }
  toggleBlockType(blockType: DraftBlockType) {
    this.state = RichUtils.toggleBlockType(this.state, blockType)
  }
  currentBlockType() {
    const selection = this.state.getSelection()
    const content = this.state.getCurrentContent()
    const block = content.getBlockForKey(selection.getStartKey())

    return block.getType()
  }
  toggleInlineStyles(inlineType: string) {
    this.state = RichUtils.toggleInlineStyle(this.state, inlineType)
  }
  private addEntity(
    entityType: EntityType,
    data: Record<string, string>,
    mutability: DraftEntityMutability
  ) {
    const contentState = this.state.getCurrentContent()
    /* Создаем Entity с данными */
    const contentStateWithEntity = contentState.createEntity(
      entityType,
      mutability,
      data
    )
    /* Получаем уникальный ключ Entity */
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    /* Обьединяем текущее состояние с новым */
    const newState = EditorState.set(this.state, {
      currentContent: contentStateWithEntity
    })

    /* Вставляем ссылку в указанное место */
    this.state = RichUtils.toggleLink(
      newState,
      newState.getSelection(),
      entityKey
    )
  }

  addLink(url: string) {
    console.log(url)
    this.addEntity(EntityType.link, { url }, 'MUTABLE')
  }
  setEntityData(entityKey: string, data: any) {
    const content = this.state.getCurrentContent()
    const contentStateUpdated = content.mergeEntityData(entityKey, data)

    this.state = EditorState.push(
      this.state,
      contentStateUpdated,
      'apply-entity'
    )
  }
  toHtml() {
    const html = stateToHtml(this.state.getCurrentContent())

    return html
  }
  clear() {
    this.state = EditorState.createEmpty(decorator)
  }
}

export default new EditorStore()
