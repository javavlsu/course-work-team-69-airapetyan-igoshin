import { FC, useEffect, useState } from 'react'
import { Subscriber } from '../../../../utils/globalTypes'
import { Button } from '@mui/material'
import {
  SubscribersListItem,
  SubscribersListRoot
} from './SubscribersList.styles'
import { manageCollaborator } from '../../../../service'

const SubscribersList: FC<{ subscribers: Subscriber[]; blogId: number }> = ({
  subscribers: initialSusbcribers,
  blogId
}) => {
  const [subscribers, setSubscribers] = useState(initialSusbcribers)

  useEffect(() => setSubscribers(initialSusbcribers), [initialSusbcribers])

  const handleSubscriberRights = async (userId: number, adding = true) => {
    const response = await manageCollaborator({
      blogId,
      userId,
      create: adding
    })

    if (!response) return
    setSubscribers((prevState) =>
      prevState.map((subscriber) =>
        subscriber.id === userId
          ? { ...subscriber, isCollaborator: adding }
          : subscriber
      )
    )
  }

  return (
    <SubscribersListRoot>
      {subscribers.map((subscriber) => (
        <SubscribersListItem key={subscriber.id}>
          {subscriber.name}
          {subscriber.isCollaborator ? (
            <Button
              onClick={() => handleSubscriberRights(subscriber.id, false)}
              variant={'contained'}
              color={'error'}
            >
              Забрать права
            </Button>
          ) : (
            <Button
              onClick={() => handleSubscriberRights(subscriber.id)}
              variant={'contained'}
            >
              Сделать коллаборатором
            </Button>
          )}
        </SubscribersListItem>
      ))}
    </SubscribersListRoot>
  )
}

export default SubscribersList
