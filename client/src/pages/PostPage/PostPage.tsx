import React from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { PostComments } from '../../components/PostComments'
import { Box, styled } from '@mui/material'

const PostPageWrapper = styled('section')`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const PostTitle = styled('h2')`
  font-size: 30px;
  margin: 50px 0 0 0;
`
const PostContent = styled('p')`
  font-size: 14px;
`
const PostFooter = styled('div')`
  display: flex;
  gap: 20px;
  border-radius: 10px;
  overflow: hidden;
  background: #d9d9d9;
`
const PostPicture = styled('img')`
  background: #858585;
  width: 145px;
  align-self: stretch;
`
const PostPath = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`
const PostPathTitle = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`
const PostRating = styled('div')`
  display: flex;
  flex-grow: 1;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
`
const IconRemove = styled(RemoveIcon)`
  width: 20px;
  height: 20px;
  color: red;
`
const IconAdd = styled(AddIcon)`
  width: 20px;
  height: 20px;
  color: green;
`
const RatingButton = styled('button')`
  border: none;
  border-radius: 50%;
  background: #969696;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const PostRatingCount = styled('p')`
  font-weight: 500;
`
const CommentsWrapper = styled('div')``

export const PostPage = () => {
  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto'
      }}
    >
      <PostPageWrapper>
        <PostTitle>Заголовок поста</PostTitle>
        <PostContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          assumenda cumque ducimus eaque eligendi est et eveniet iste itaque
          iusto laborum, magnam, magni maiores maxime molestias nesciunt
          obcaecati perferendis reprehenderit repudiandae sequi similique vitae,
          voluptates voluptatum. A at consequatur ipsa magnam officia provident
          quam quas? Ad aliquam inventore labore molestiae numquam odit quia
          soluta! Asperiores dignissimos enim eveniet libero obcaecati optio
          porro quas rerum soluta tenetur. Adipisci amet at consectetur
          consequatur dolor dolores doloribus dolorum enim ex excepturi
          exercitationem explicabo id impedit incidunt ipsa iusto libero magni
          maiores minus modi nam natus nisi numquam placeat possimus quia quis
          quod reiciendis repellat sapiente, tempore temporibus veniam
          voluptatum. Accusamus animi asperiores at consequatur culpa ducimus,
          eligendi error hic id incidunt officia quasi ratione, rem sunt tenetur
          ullam voluptas. A aliquid asperiores, aspernatur atque delectus
          dolorem error exercitationem expedita fugiat harum illo incidunt
          inventore nam nihil odio perferendis rerum sunt totam veritatis vitae.
          Accusantium ad atque consectetur culpa cumque deserunt dicta error
          excepturi expedita explicabo harum inventore ipsa ipsum iusto
          laboriosam magni nam odit quasi quibusdam repellat sint sunt
          temporibus, totam ullam velit voluptate voluptatum. Aliquam aspernatur
          dolore enim in mollitia quibusdam quis recusandae sapiente vel
          voluptates. A, at, necessitatibus? Adipisci animi cum delectus dicta
          dignissimos dolores, eos eum incidunt inventore ipsa labore nostrum
          optio perspiciatis similique ullam ut voluptates. Assumenda aut
          consequuntur corporis doloremque ducimus hic neque nisi sit vel
          veritatis. Ab accusamus assumenda consectetur cumque dolorem earum
          esse expedita fugiat fugit, hic incidunt itaque, minima modi non
          placeat quos soluta unde, veniam. Ab culpa dolor dolores eaque
          eligendi et expedita minima minus, obcaecati praesentium quasi quidem
          sunt vel. Aliquid animi dolor dolores iusto optio? A ad alias aliquam
          architecto dolore doloremque ducimus ea eligendi eos, ex explicabo
          illo ipsam laboriosam magni modi nam nesciunt nisi nobis optio quam
          qui quia ratione recusandae repellat repellendus repudiandae rerum sed
          unde voluptates voluptatum? Alias, earum nam necessitatibus similique
          tempora totam. Ab culpa cupiditate dolore dolorem iusto minus, nemo
          nobis non perferendis placeat quasi rerum ut. At deleniti dolores
          earum eos optio perferendis veritatis! At eos, facere fugit hic
          laboriosam laborum necessitatibus quaerat quasi reiciendis unde!
          Distinctio labore laudantium nam nobis perspiciatis provident rerum
          temporibus vitae voluptates. Consectetur illo recusandae repellendus.
          A accusamus aspernatur at commodi consequuntur corporis dolor
          doloribus error facilis id, ipsa iusto labore nam neque nisi saepe sed
          sunt tempora tempore tenetur! Alias aliquam earum eveniet iure magnam
          modi officia quae quo? Ab accusantium, adipisci aliquid architecto
          debitis ducimus et eum illum labore officiis, recusandae tempore
          tenetur ut! Accusantium ad amet deleniti dolores eos ipsum molestias
          mollitia, quibusdam veniam voluptatem? Dicta esse hic laudantium
          libero nemo quam, quo sequi! A aperiam beatae corporis dignissimos
          dolor, dolores eos fugiat id illo incidunt ipsam, ipsum iusto labore,
          laboriosam libero maiores maxime minima neque optio placeat provident
          rerum veniam vero. Corporis deserunt enim error explicabo mollitia
          nemo quae quaerat repellat sit vel. Deserunt esse ipsa ut. Alias
          aliquam aliquid, debitis dignissimos doloremque dolores doloribus eius
          harum id modi mollitia nam quos ratione soluta ut! Assumenda beatae
          dicta, dolor dolore eius et explicabo, iusto, laborum minima
          necessitatibus officia optio porro quia quis quod recusandae vel. Ab,
          ad harum ipsa minus nihil odio placeat recusandae totam. Ad adipisci
          cumque dolore, doloremque expedita facere hic impedit ipsam iusto
          quos. Aspernatur corporis deleniti dicta enim eum explicabo, nobis
          officia perspiciatis placeat quaerat saepe sed sequi voluptate.
          Aspernatur at consequatur cum debitis dolorem ducimus eaque eius enim
          ex exercitationem explicabo fugiat hic illum ipsum itaque iure laborum
          libero nemo nobis odit omnis provident quae, quidem ratione
          repellendus reprehenderit tenetur vel vitae voluptas voluptatibus! Ab
          accusamus atque consequuntur cumque debitis, doloremque eius facere
          inventore nemo neque placeat possimus praesentium quasi quod saepe
          sequi suscipit unde. A ab ad adipisci aspernatur aut blanditiis
          debitis deserunt dicta ducimus earum eligendi eos eveniet fugit harum,
          id labore libero maxime minima modi nam natus neque non nostrum nulla
          optio pariatur perspiciatis quae quas quibusdam quidem, quod
          recusandae, soluta suscipit totam unde veniam voluptatem. Aspernatur
          cumque explicabo iure iusto magni nam natus numquam praesentium
          suscipit voluptates. Eligendi eveniet nemo optio quaerat quos
          recusandae vitae! Aut ea inventore iure maiores minima minus nobis,
          odit officiis, optio provident quis repellendus vitae! Incidunt nam
          rerum sequi. Aperiam dignissimos dolore expedita facilis nobis non
          placeat sapiente voluptas? Aliquid commodi culpa deserunt enim esse
          expedita, illum iure magnam nemo obcaecati quaerat quia quis sed sit
          veritatis. Cumque ducimus in maxime ratione ullam. Accusamus at atque
          consectetur consequuntur cum distinctio dolorem facere facilis illo in
          laboriosam laborum laudantium libero magnam molestiae necessitatibus
          non odit perferendis, possimus quam, quasi quos rem rerum saepe sed
          sequi voluptates? Adipisci alias architecto assumenda consequatur
          corporis cum dolor dolorum eos eum expedita incidunt ipsam iure minus
          nobis officiis perferendis possimus qui, quidem quis repellat
          repellendus saepe similique soluta tempora vitae voluptatem
          voluptatibus. Facere harum natus saepe voluptatibus? Amet consectetur
          culpa dicta enim exercitationem fuga laboriosam laborum minima
          mollitia nobis, numquam perferendis possimus, quasi quos reiciendis
          sint soluta tempore? Ab alias amet architecto, asperiores at atque
          consequatur cupiditate debitis distinctio doloribus esse itaque
          mollitia nisi nobis perferendis perspiciatis quasi quibusdam quos sed
          voluptate? A accusantium aliquam aliquid architecto, aspernatur,
          assumenda autem consequatur culpa distinctio ea enim eum excepturi
          expedita id illo impedit incidunt iusto laboriosam maxime minus
          necessitatibus obcaecati officia placeat possimus quae quidem quis quo
          quos reiciendis saepe sapiente similique sunt totam ut veniam
          voluptate voluptatum. Aliquam assumenda aut consequuntur cum
          dignissimos distinctio dolorem eius, eligendi eum eveniet explicabo
          fuga fugit id in ipsa ipsum iure labore maiores mollitia neque nisi,
          officia officiis qui quia quis, quod rem repellendus reprehenderit
          soluta tempora temporibus ullam vero vitae? Ab at atque, beatae
          delectus dignissimos dolor ducimus in iure nostrum nulla quaerat
          ratione, tenetur unde? Alias, aliquam culpa doloribus et excepturi
          fuga laborum minima nobis odit officia officiis possimus, quibusdam
          quidem similique voluptas. Ab culpa eveniet id impedit in incidunt
          iusto, minima mollitia, odit quod voluptas voluptatibus. Blanditiis
          culpa dolorum ducimus eaque eligendi error et, ex fugit harum illo
          illum laborum maxime non optio quae quo, recusandae sit, soluta
          veniam.
        </PostContent>
        <PostFooter>
          <PostPicture />
          <PostPath>
            <PostPathTitle>Название блога</PostPathTitle>
            <ArrowRightIcon />
            <PostPathTitle>Название поста</PostPathTitle>
          </PostPath>
          <PostRating>
            <RatingButton>
              <IconRemove />
            </RatingButton>
            <PostRatingCount>567</PostRatingCount>
            <RatingButton>
              <IconAdd />
            </RatingButton>
          </PostRating>
        </PostFooter>
        <CommentsWrapper>
          <PostComments />
        </CommentsWrapper>
      </PostPageWrapper>
    </Box>
  )
}
