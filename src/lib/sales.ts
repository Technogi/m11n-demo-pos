import { invoke } from "@tauri-apps/api";
import axios from "axios";

export const registerSale = async (productId: number) => {
  console.log(1)
  try {
    await invoke("do_sale", { productId });
    console.log(2)
  } catch (e) {
    console.error("ERROR", e);
    throw e
  }

  console.log(3)
  try {
    const resp = await axios.post(
      "https://hermes-m11n-demo.io.technogi.com.mx/",
      {
        "event-type": "NewSale",
        "product-id": productId,
        "sold-on": Date.now(),
      },
      {
        headers: {
          "X-Api-Key": "je5uvQ3fX88zh8I0rKzdR4FxSTxqln2CaOFjQ1R7",
        },
      }
    );
    console.log(resp)
  } catch (e) {
    console.error("ERROR", e);
  }
};