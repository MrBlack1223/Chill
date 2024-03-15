import axios, { AxiosResponse } from "axios"
import { useEffect, useMemo, useState } from "react"
import { SERVER } from "../utils/utils";

interface FetchResult<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

const useLoadData = <T extends Partial<T>>(url: string, options: {}, runCondition: any, defaultData: T, reloadCondition? : any) : FetchResult<T> => {
    const [data,setData] = useState<T>({} as T)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal
        const correctOpt = {...options, signal}

        const loadData = async () => {
          setLoading(true);
          try {
            const response: AxiosResponse<T> = await axios.get(SERVER + url,correctOpt);
            setData(response.data);
          } catch (e) {
            const error = e as Error
            if (!axios.isCancel(error)) {
              setError(error);
            }
          } finally {
            setLoading(false);
          }
        }

        if(runCondition){
            loadData()
        }else{
            setData(defaultData)
        }
        
    
        return ()=>{
          controller.abort()
        }
      },reloadCondition)
    
    const memoizedResult = useMemo(() => ({ data, loading, error }), [data, loading, error])

    return memoizedResult
} 

export default useLoadData