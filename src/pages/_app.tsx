import type { AppProps } from "next/app";

import "../style.css";
import "../App.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith("/cli")) return <Component {...pageProps} />;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
