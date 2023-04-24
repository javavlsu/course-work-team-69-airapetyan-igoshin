import React from 'react'
import { TextEditor } from '../../components/TextEditor'
import { EditArea, PageContainer } from './PostEdit.styles'

export const PostEdit = () => {
  const stubHtml =
    '<p><span style="font-style:italic" class="text--italic">some</span></p>'

  // console.log(editorStore.loadContent())
  return (
    <PageContainer>
      <EditArea>
        <TextEditor html={stubHtml} />
      </EditArea>
    </PageContainer>
  )
}
