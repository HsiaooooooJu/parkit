import { fetchAllPark, fetchAllRemain } from './ParkingAPI'

jest.mock('./ParkingAPI')

describe('Parking API', () => {
  beforeEach(() => jest.clearAllMocks())
  test('fetch all parking lots successfully', async () => {
    const allParkRes = {
      data: {
        UDATETIME: 'Thu Nov 10 00:00:00 CST 2022',
        park: [
          {
            id: 1,
            name: '',
            address: '',
            tel: '',
            payex: '',
            serviceTime: '',
            latlng: { lat: 25, lng: 121 },
            totalCar: 10
          }
        ]
      }
    }
    const fetchAllParkMock = fetchAllPark.mockResolvedValue(allParkRes)
    const response = await fetchAllParkMock()
    expect(fetchAllParkMock).toBeCalledTimes(1)
    expect(response).toEqual(allParkRes)
    expect(response.data.park).toHaveLength(1)
  })

  test('fetch all available space', async () => {
    const allRemainRes = {
      data: {
        UDATETIME: 'Thu Nov 10 00:00:00 CST 2022',
        park: [
          {
            id: 1,
            availableCar: 220
          }
        ]
      }
    }
    const fetchAllRemainMock = fetchAllRemain.mockResolvedValue(allRemainRes)
    const response = await fetchAllRemainMock()
    expect(fetchAllRemainMock).toBeCalledTimes(1)
    expect(response).toEqual(allRemainRes)
    expect(response.data.park).toHaveLength(1)
  })
  afterAll(() => jest.clearAllMocks())
})
