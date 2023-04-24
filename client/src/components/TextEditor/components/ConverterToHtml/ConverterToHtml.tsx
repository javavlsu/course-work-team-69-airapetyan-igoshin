import { convertFromHTML, convertToHTML } from 'draft-convert'
import { BlockStyle, EntityType, InlineStyle } from '../../TextEditor.config'

export const stateToHtml = convertToHTML<InlineStyle, BlockStyle>({
  styleToHTML: (style) => {
    switch (style) {
      case InlineStyle.BOLD:
        return <strong />
      case InlineStyle.ITALIC:
        return <span style={{ fontStyle: 'italic' }} className="text--italic" />
      case InlineStyle.UNDERLINE:
        return (
          <span
            style={{ textDecoration: 'underline' }}
            className="text--underline"
          />
        )
      case InlineStyle.CODE:
        return (
          <span
            style={{ fontFamily: "'Consolas', sans-serif'" }}
            className="text--code"
          />
        )
      default:
        return null
    }
  },
  blockToHTML: (block) => {
    switch (block.type) {
      case BlockStyle.h1:
        return <h1 />
      case BlockStyle.h2:
        return <h2 />
      case BlockStyle.BLOCKQUOTE:
        return <blockquote />
      case BlockStyle.UNORDERED_LIST:
        return <ul />
      case BlockStyle.ORDERED_LIST:
        return <ol />
      case BlockStyle.DEFAULT:
        return <p />
      default:
        return null
    }
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === EntityType.link) {
      return <a href={entity.data.url}>{originalText}</a>
    }
  }
})

export const htmlToState = convertFromHTML<DOMStringMap, BlockStyle>({
  htmlToStyle: (nodeName, node, currentStyle) => {
    if (nodeName === 'strong') {
      return currentStyle.add(InlineStyle.BOLD)
    } else if (nodeName === 'span' && node.classList.contains('text--italic')) {
      return currentStyle.add(InlineStyle.ITALIC)
    } else if (
      nodeName === 'span' &&
      node.classList.contains('text--underline')
    ) {
      return currentStyle.add(InlineStyle.UNDERLINE)
    } else if (nodeName === 'span' && node.classList.contains('text--code')) {
      return currentStyle.add(InlineStyle.CODE)
    }

    return currentStyle
  },
  htmlToBlock: (nodeName) => {
    console.log(nodeName)

    switch (nodeName) {
      case 'h1':
        return BlockStyle.h1
      case 'h2':
        return BlockStyle.h2
      case 'blockquote':
        return BlockStyle.BLOCKQUOTE
      case 'ol':
        return BlockStyle.ORDERED_LIST
      case 'ul':
        return BlockStyle.UNORDERED_LIST
      case 'p':
      case 'div':
        return BlockStyle.DEFAULT
      default:
        return false
    }
  },
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === 'a' && node.href) {
      return createEntity(EntityType.link, 'MUTABLE', { url: node.href })
    }
  }
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.htmlToState = htmlToState
