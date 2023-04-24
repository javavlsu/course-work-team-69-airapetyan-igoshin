import { ContentBlock, ContentState, DraftDecorator } from 'draft-js'
import { EntityType } from '../../TextEditor.config'
import Link from './Link'

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
): void {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === EntityType.link
    )
  }, callback)
}

const decorator: DraftDecorator = {
  strategy: findLinkEntities,
  component: Link
}

export default decorator
