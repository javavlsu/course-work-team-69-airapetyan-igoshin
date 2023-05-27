import { action, makeAutoObservable } from 'mobx'
import { IDesignConfig } from '../utils/globalTypes'

export const defaultDesignConfig: IDesignConfig = {
  previewOptions: {
    name: 'Превью блога',
    height: 50
  },
  previewContainerOptions: {
    name: 'Содержимое превью',
    horizontal: 'center',
    vertical: 'center',
    gap: 15
  },
  avatarBlockOptions: {
    name: 'Позиция аватара',
    horizontal: 'center'
  },
  blogAvatarOptions: {
    name: 'Аватар',
    height: 100,
    width: 100,
    borderRadius: '100%'
  },
  blogNameOptions: {
    name: 'Имя блога',
    fontSize: 20,
    color: '#fff',
    textTransform: 'capitalize',
    textDecoration: 'none',
    fontStyle: 'none',
    margin: '0'
  },
  blogDescriptionOptions: {
    name: 'Описание блога',
    fontSize: 14,
    color: '#fff',
    textTransform: 'capitalize',
    textDecoration: 'none',
    fontStyle: 'none',
    margin: '0'
  },
  statisticsBlockOptions: {
    name: 'Расположение статистики',
    direction: 'row',
    horizontal: 'start',
    vertical: 'center',
    gap: 20
  },
  statisticsItemOptions: {
    name: 'Элемент статистики',
    direction: 'row',
    horizontal: 'start',
    vertical: 'center',
    gap: 5
  },
  statisticsCountsOptions: {
    name: 'Цифры статистики',
    isGroup: true,
    subscribers: {
      name: 'Подписчики',
      fontSize: 14,
      color: '#fff',
      fontWeight: 700
    },
    rating: {
      name: 'Рейтинг',
      fontSize: 14,
      color: '#166F00',
      fontWeight: 700
    },
    posts: {
      name: 'Посты',
      fontSize: 14,
      color: '#fff',
      fontWeight: 700
    }
  },
  blogPostsOptions: {
    name: 'Кофигурация постов',
    columns: 2,
    width: '70%'
  }
}

class DesignStore {
  config = defaultDesignConfig
  constructor() {
    makeAutoObservable(this)
  }

  handleDesignParam<T extends keyof IDesignConfig>(
    block: T | string,
    key: keyof IDesignConfig[T]
  ) {
    let path = this.config

    if (block.includes('.')) {
      block.split('.').forEach((_newBlock) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        path = path[_newBlock]
      })
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      path = path[block]
    }

    const handler = (newValue: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      path[key] = newValue
    }

    return action(handler)
  }
}

export default new DesignStore()
