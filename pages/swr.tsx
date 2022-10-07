import type { NextPage } from "next";
import axios from "axios";
import useSWR from "swr";

const instanceAxios = axios.create({
  baseURL: "http://localhost:3333",
});

const pingApi = () => instanceAxios.get("/healthy").then((res) => res.data);

const useFetch = <T extends Object>(call: (url: string) => Promise<T>) => {
  const { data, error, mutate } = useSWR<T>(call, { suspense: true });
  
  const loading = !data && !error;
  return { data, error, mutate, loading };
};


const HomeNacked = () => {
  const request = useFetch<{ healthy: boolean }>(pingApi);

  return (
    <div>
      {request.loading && <div>Loading...</div>}
      <div>{request.data && JSON.stringify(request.data)}</div>

      <button onClick={() => request.mutate()}>Mutate</button>
    </div>
  );
};

const Home: NextPage = () => {
  return (
      <HomeNacked />
  );
};

export default Home;

// new feat asdasd