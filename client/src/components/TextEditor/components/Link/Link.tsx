import { FC, PropsWithChildren } from 'react'
import { LinkProps } from '../../TextEditor.types'
import editorStore from '../../../../store/editorStore'

const Link: FC<PropsWithChildren<LinkProps>> = ({
  children,
  entityKey,
  contentState
}) => {
  const { url } = contentState.getEntity(entityKey).getData()

  const handleClick = async () => {
    const newUrl = await prompt('URL: ', url)

    newUrl && editorStore.setEntityData(entityKey, { url: newUrl })
  }

  return (
    <a href={url} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Link
