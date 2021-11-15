import {
  getGameAsync,
  getTagAsync,
  getLatestTagAsync,
  getTagsAsync,
  getTag1Async,
  bikeTagSanityInstance,
  bikeTagImgurInstance,
  bikeTagRedditInstance,
  bikeTagTwitterInstance,
} from '../../examples/node/index'

test('BikeTagClient integration tests run when they can', async () => {
  expect(true).toBeTruthy()
})

if (bikeTagSanityInstance) {
  test('BikeTagClient sanity instance can retrieve game data', async () => {
    const testGameData = await getGameAsync(bikeTagSanityInstance)

    expect(testGameData).toMatchSnapshot()
  })

  test('BikeTagClient sanity instance can retrieve tag data', async () => {
    const testTagData = await getTagAsync(bikeTagSanityInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient sanity instance can retrieve tag 1 data', async () => {
    const testTagData = await getTag1Async(bikeTagSanityInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient sanity instance can retrieve latest tag data', async () => {
    const testTagData = await getLatestTagAsync(bikeTagSanityInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient sanity instance can retrieve all tags data', async () => {
    const testTagsData = await getTagsAsync(bikeTagSanityInstance)

    expect(testTagsData).toMatchSnapshot()
  })
}

if (bikeTagImgurInstance) {
  test('BikeTagClient imgur instance can retrieve tag data', async () => {
    const testTagData = await getTagAsync(bikeTagImgurInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient imgur instance can retrieve tag 1 data', async () => {
    const testTagData = await getTag1Async(bikeTagImgurInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient imgur instance can retrieve latest tag data', async () => {
    const testTagData = await getLatestTagAsync(bikeTagImgurInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient imgur instance can retrieve all tags data', async () => {
    const testTagsData = await getTagsAsync(bikeTagImgurInstance)

    expect(testTagsData).toMatchSnapshot()
  })
}

if (bikeTagRedditInstance) {
  test('BikeTagClient reddit instance can retrieve tag data', async () => {
    const testTagData = await getTagAsync(bikeTagRedditInstance, false, {
      source: 'reddit',
    })

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient reddit instance can retrieve tag 1 data', async () => {
    const testTagData = await getTag1Async(bikeTagRedditInstance, false, {
      source: 'reddit',
    })

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient reddit instance can retrieve latest tag data', async () => {
    const testTagData = await getLatestTagAsync(bikeTagRedditInstance, false, {
      source: 'reddit',
    })

    expect(testTagData).toMatchSnapshot()
  })

  /// Test takes too long
  // test('BikeTagClient reddit instance can retrieve all tags data', async () => {
  //   const testTagsData = await getTagsAsync(bikeTagRedditInstance, false, { source: 'reddit', limit: 100 })

  //   expect(testTagsData).toMatchSnapshot()
  // })
}

if (bikeTagTwitterInstance) {
  test('BikeTagClient twitter instance can retrieve tag data', async () => {
    const testTagData = await getTagAsync(bikeTagTwitterInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient twitter instance can retrieve tag 1 data', async () => {
    const testTagData = await getTag1Async(bikeTagTwitterInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient twitter instance can retrieve latest tag data', async () => {
    const testTagData = await getLatestTagAsync(bikeTagTwitterInstance)

    expect(testTagData).toMatchSnapshot()
  })

  test('BikeTagClient twitter instance can retrieve all tags data', async () => {
    const testTagsData = await getTagsAsync(bikeTagTwitterInstance)

    expect(testTagsData).toMatchSnapshot()
  })
}
