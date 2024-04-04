import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import cookie from 'react-cookies'

const ReadCookie = (name: string) => {
    if (cookie.load(name) !== undefined) {
        const data = cookie.load(name)
        return data
    }
    return false
}

const baseQuery = (token: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
    return fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_SERVICE,
        prepareHeaders: headers => {
            headers.set('Accept', 'application/json')
            headers.set('Content-Type', 'application/json')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    })
}

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const token = await ReadCookie(process.env.NEXT_PUBLIC_ACCESSTOKENKEY || "");
    let result = await baseQuery(token || (process.env.NEXT_PUBLIC_ACCESSTOKENKEY ?? ""))(args as any, api, extraOptions);
    return result;
};

export const api = createApi({
    baseQuery: dynamicBaseQuery,
    reducerPath: 'api',
    tagTypes: [],
    endpoints: () => ({}),
})