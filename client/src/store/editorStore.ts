import { makeAutoObservable } from 'mobx'
import { DraftBlockType, EditorState, RichUtils } from 'draft-js'

class EditorStore {
  state: EditorState

  constructor() {
    makeAutoObservable(this)

    this.state = EditorState.createEmpty()
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
}

export default new EditorStore()
