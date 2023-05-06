import { css, styled } from '@mui/material'
import {
  AvatarBlockOptions,
  BlogAvatarOptions,
  BlogDescriptionOptions,
  BlogNameOptions,
  BlogPostsOptions,
  PreviewContainerOptions,
  PreviewOptions,
  StatisticsBlockOptions,
  StatisticsCountOptions,
  StatisticsItemOptions
} from './Blog.types'

export const BlogWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

export const BlogPreviewWrapper = styled('div')<PreviewOptions>`
  min-height: ${({ height }) => height}vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #9a9a9a;
`

export const PreviewContainer = styled('div')<PreviewContainerOptions>`
  display: flex;
  flex-direction: column;
  align-items: ${({ horizontal }) => horizontal};
  gap: ${({ gap }) => gap}px;
  flex-grow: 1;
  justify-content: ${({ vertical }) => vertical};
  align-items: ${({ horizontal }) => horizontal};
`

export const AvatarBlock = styled('div')<AvatarBlockOptions>`
  width: 100%;
  display: flex;
  justify-content: ${({ horizontal }) => horizontal};
`

export const BlogAvatar = styled('img')<BlogAvatarOptions>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border-radius: ${({ borderRadius }) => borderRadius};
  background: #d9d9d9;
`

export const BlogName = styled('h2')<BlogNameOptions>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
  text-transform: ${({ textTransform }) => textTransform};
  text-decoration: ${({ textDecoration }) => textDecoration};
  font-style: ${({ fontStyle }) => fontStyle};
  margin: ${({ margin }) => margin};
`

export const BlogDescription = styled('h2')<BlogDescriptionOptions>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
  text-transform: ${({ textTransform }) => textTransform};
  text-decoration: ${({ textDecoration }) => textDecoration};
  font-style: ${({ fontStyle }) => fontStyle};
  margin: ${({ margin }) => margin};
`

export const StatisticsBlock = styled('div')<StatisticsBlockOptions>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${(props) =>
    props.direction === 'column' ? props.vertical : props.horizontal};
  align-items: ${(props) =>
    props.direction === 'column' ? props.horizontal : props.vertical};
  gap: ${({ gap }) => gap}px;
`

export const StatisticsItem = styled('div')<StatisticsItemOptions>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${(props) =>
    props.direction === 'column' ? props.vertical : props.horizontal};
  align-items: ${(props) =>
    props.direction === 'column' ? props.horizontal : props.vertical};
  gap: ${({ gap }) => gap}px;
  font-size: 12px;
`

export const StatisticsCount = styled('span')<StatisticsCountOptions>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
`

export const BlogContentWrapper = styled('div')<{ isEditMode: boolean }>`
  flex-grow: 1;
  width: 100%;
  display: grid;
  grid-template: 1fr / ${({ isEditMode }) => (isEditMode ? '32px' : 0)} 238px 1fr;
`

export const BlogPostsWrapper = styled('div')<{ isAsideOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-column: ${({ isAsideOpen }) => (isAsideOpen ? '3' : '2')} / -1;
`

export const BlogPostsContainer = styled('div')<BlogPostsOptions>`
  width: ${({ width }) => width};
  display: grid;
  grid-template: 1fr / repeat(${({ columns }) => columns}, 1fr);
  column-gap: 40px;
  row-gap: 40px;
  margin: 50px 0;
`

export const PostsColumn = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
`

export const ToolsPanel = styled('div')`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  overflow: hidden;
  gap: 20px;
  padding: 20px;
`

export const ToolsItem = styled('div')<{ $animated: boolean }>`
  height: 100%;
  display: flex;
  min-width: 40px;
  transition: 0.1s;
  cursor: pointer;
  ${({ $animated }) =>
    $animated &&
    css`
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      }
    `}
`

export const AsideToggleButton = styled('div')`
  width: 32px;
  height: 32px;
  background: #a8a8a8;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ConfigContainer = styled('div')`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`

export const ConfigBlock = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ConfigBlockHeader = styled('h4')`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
`

export const ConfigBlockRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  padding: 0 16px;
`

export const ConfigBlockLabel = styled('p')`
  font-size: 12px;
  padding: 0;
  margin: 0;
`
