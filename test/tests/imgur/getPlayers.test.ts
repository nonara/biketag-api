import { isPlayer } from '#src/common/schema'

const imgurGetPlayersMethod = 'biketag.images.getPlayers'

/// ***************************  Config  *************************** ///

import { MockBikeTag, MockImgur, MockTag } from '#test-src'
import * as imgurModule from '#src/imgur'
import { HttpStatusCode } from '#src/common/enums'

/// ***************************  Test  *************************** ///

describe(imgurGetPlayersMethod, () => {
  const mockClient = MockImgur.createMockClient()
  const mockBikeTagClient = MockBikeTag.createMockClient()
  const getPlayers = imgurModule.getPlayers.bind(
    mockBikeTagClient,
    <any>mockClient
  )

  test(`${imgurGetPlayersMethod} method requires ImgurHash from payload`, () => {
    return expect(getPlayers(<any>{})).rejects.toThrow()
  })

  // TODO - It looks like the only input path here is `hash`, if that's not
  //   accurate, see similar test section in `getTags` for example of how to
  //   test multiple inputs
  test(`${imgurGetPlayersMethod} method resolves data of type Player[]`, async () => {
    const res = await getPlayers({
      hash: MockTag.hashes[0],
      game: MockTag.game,
    })

    expect(Array.isArray(res.data))
    res.data.forEach((tag) => expect(isPlayer(tag)).toBeTruthy())
  })

  test(`${imgurGetPlayersMethod} method resolves status of HttpStatusCode.Ok`, () => {
    return expect(
      getPlayers({
        hash: MockTag.hashes[0],
        game: MockTag.game,
      })
    ).resolves.toMatchObject({ status: HttpStatusCode.Ok })
  })
})