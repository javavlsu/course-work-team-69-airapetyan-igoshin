import { convertFromHTML, convertToHTML } from 'draft-convert'
import { BlockStyle, EntityType, InlineStyle } from '../../TextEditor.config'

export const stateToHtml = convertToHTML<InlineStyle, BlockStyle>({
  styleToHTML: (style) => {
    switch (style) {
      case InlineStyle.BOLD:
        return <strong />
      case InlineStyle.ITALIC:
        return <span className="text--italic" />
      case InlineStyle.UNDERLINE:
        return <span className="text--underline" />
      case InlineStyle.CODE:
        return <span className="text--code" />
      default:
        return null
    }
  },
  blockToHTML: (block) => {
    switch (block.type) {
      case BlockStyle.h1:
        return <h1 className={'post__text--title'} />
      case BlockStyle.h2:
        return <h2 className={'post__text--subtitle'} />
      case BlockStyle.BLOCKQUOTE:
        return <blockquote className={'post__text--blockquote'} />
      case BlockStyle.UNORDERED_LIST:
        return {
          element: <li />,
          nest: <ul className={'post__text--list'} />
        }
      case BlockStyle.ORDERED_LIST:
        return {
          element: <li />,
          nest: <ul className={'post__text--list-ordered'} />
        }
      case BlockStyle.DEFAULT:
        return <p className={'post__text'} />
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
