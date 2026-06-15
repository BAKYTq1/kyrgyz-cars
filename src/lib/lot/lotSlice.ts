  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
  import { apiFetch } from '../../api/Api'

  export interface CarSpecs {
    id: number
    key_info: string
    transmission: number
    hybrid: null | string
    fuel_type: string
    drive_type: number
    engine_rendered: string
  }

  export interface CarImg {
    img_1?: string
    img_2?: string
    img_3?: string
    img_4?: string
    img_5?: string
  }

  export interface Car {
    id: number
    name: string
    name_long: string
    tag: string
    lot: string
    vin: string
    status: number
    search_status: string
    seller: string
    seller_trusted: boolean
    loss_type: string
    primary_damage: string
    has_video: boolean
    has_360_view: boolean
    odometer: number
    location: string
    prebid_price: string
    final_bid: null | number
    final_bid_formatted: null | string
    estimated_min: number
    estimated_max: number
    start_code: string
    start_code_color: string
    specs: CarSpecs
    img: CarImg
    seller_long?: string
    time_left?: string
    time_left_formatted?: string
    buy_now_price?: string
    odometer_substr?: number
    odometer_km_substr?: number
    img_large?: Record<string, string>
    sale_document?: string
    sale_document_external?: string
  }

  export interface LotListParams {
    status?: string
    search_status?: string
    loss_type?: string
    location?: string
    seller?: string
    search?: string
    ordering?: string
  }

  export const fetchLots = createAsyncThunk(
    'lots/fetchList',
    async (params: LotListParams = {}, { rejectWithValue }) => {
      try {
        const query = new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
        ).toString()
        return await apiFetch<Car[]>(`/lots/${query ? `?${query}` : ''}`)
      } catch (error) {
        return rejectWithValue((error as Error).message)
      }
    }
  )

  export const fetchLotById = createAsyncThunk(
    'lots/fetchById',
    async (id: number, { rejectWithValue }) => {
      try {
        return await apiFetch<Car>(`/lots/${id}/`)
      } catch (error) {
        return rejectWithValue((error as Error).message)
      }
    }
  )

  interface LotsState {
    list: Car[]
    total: number
    currentLot: Car | null
    loading: boolean
    error: string | null
  }

  const initialState: LotsState = {
    list: [],
    total: 0,
    currentLot: null,
    loading: false,
    error: null,
  }

  const lotSlice = createSlice({
    name: 'lots',
    initialState,
    reducers: {
      clearCurrentLot(state) { state.currentLot = null },
      clearError(state) { state.error = null },
    },
    extraReducers: builder => {
      builder
        .addCase(fetchLots.pending, state => { state.loading = true; state.error = null })
        .addCase(fetchLots.fulfilled, (state, action) => {
          state.loading = false
          state.list = action.payload
          state.total = action.payload.length
        })
        .addCase(fetchLots.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
        })

      builder
        .addCase(fetchLotById.pending, state => { state.loading = true; state.error = null })
        .addCase(fetchLotById.fulfilled, (state, action) => {
          state.loading = false
          state.currentLot = action.payload
        })
        .addCase(fetchLotById.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
        })
    },
  })

  export const { clearCurrentLot, clearError } = lotSlice.actions
  export default lotSlice.reducer