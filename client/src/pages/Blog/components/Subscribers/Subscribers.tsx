import { ChangeEvent, FC, useEffect, useState } from 'react'
import { TextField, Typography, Modal } from '@mui/material'
import { SubscribersProps } from './Subscribers.types'
import { SubscribersList } from '../SubscribersList'
import { ModalContent } from './Subscribers.styles'

const Subscribers: FC<SubscribersProps> = ({
  subscribers,
  blogId,
  ...props
}) => {
  const [searchText, setSearchText] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    console.log('search on ' + searchText)
  }, [searchText])

  return (
    <Modal {...props}>
      <ModalContent>
        <Typography variant={'h6'}>Подписчики</Typography>
        <TextField
          value={searchText}
          onChange={handleChange}
          placeholder={'Поиск...'}
          sx={{ width: '100%' }}
        />
        <SubscribersList blogId={blogId} subscribers={subscribers} />
      </ModalContent>
    </Modal>
  )
}

export default Subscribers
