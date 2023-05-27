import React, { FC } from 'react'
import { Box, Button } from '@mui/material'
import { AsideToggleButton, ConfigContainer } from '../Blog.styled'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import designStore from '../../../store/designStore'
import { ConfigNode } from './ConfigNode'
import { AsideMenu } from '../../../components/AsideMenu'
import { observer } from 'mobx-react-lite'
import { updateBlog } from '../../../service'
import { FieldValues, UseFormGetValues } from 'react-hook-form'

interface BlogAsideProps {
  isOpen: boolean
  toggle: () => void
  getValues: UseFormGetValues<FieldValues>
  updateBlogOnFE: (name: string, description: string) => void
  blogId: number
}

const BlogAsideComponent: FC<BlogAsideProps> = ({
  isOpen,
  toggle,
  getValues,
  updateBlogOnFE,
  blogId
}) => {
  const handleSave = async () => {
    const [name, description] = getValues(['name', 'description'])
    const res = await updateBlog({
      id: blogId,
      name,
      description,
      config: JSON.stringify(designStore.config)
    })

    if (!res) return
    updateBlogOnFE(name, description)
  }

  return (
    <AsideMenu isOpen={isOpen}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'end',
          cursor: 'pointer'
        }}
      >
        <AsideToggleButton onClick={toggle}>
          {isOpen ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
        </AsideToggleButton>
      </Box>
      {isOpen && (
        <ConfigContainer>
          {Object.entries(designStore.config).map(([objKey, objValue]) => (
            <ConfigNode key={objKey} objKey={objKey} objValue={objValue} />
          ))}
          <Box sx={{ marginTop: '10px' }}>
            <Button variant={'contained'} onClick={handleSave}>
              Сохранить
            </Button>
          </Box>
        </ConfigContainer>
      )}
    </AsideMenu>
  )
}

export const BlogAside = observer(BlogAsideComponent)
