import { ModalProps } from '@mui/material'
import { Subscriber } from '../../../../utils/globalTypes'

export type SubscribersProps = Omit<ModalProps, 'children'> & {
  subscribers: Subscriber[]
  blogId: number
}
